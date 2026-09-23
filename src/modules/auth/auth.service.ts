import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../../generated/prisma/enums.js';
import { UserService } from '../user/user.service.js';
import { AuthRepository } from './auth.repository.js';
import { SignupDto } from './dto/signup.dto.js';
import { Prisma } from '../../generated/prisma/client.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

export type Payload = {
  sub: number;
  whatsApp: string;
  role: Role;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authRepo: AuthRepository,
  ) {}

  async register(registerDto: SignupDto) {
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const data: Prisma.UserCreateInput = {
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
      phoneNo: registerDto.phoneNo,
      whatsApp: registerDto.whatsApp,
      address: registerDto.address,
      role: registerDto.role,
    };

    return this.authRepo.register(data);
  }

  async login(user: LoginDto) {
    const currentUser = await this.userService.getUserByWhatsApp(user.whatsApp);
    if (!currentUser) {
      throw new UnauthorizedException(
        'Invalid Credentials : User does not exist',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      currentUser.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid Credentials : Password does not match',
      );
    }

    const payload: Payload = {
      sub: currentUser.id,
      whatsApp: currentUser.whatsApp,
      role: currentUser.role,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async getMe(userId: number) {
    const user = await this.authRepo.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto.js';
import {
  UserCreateInput,
  UserUpdateInput,
} from '../../generated/prisma/models.js';
import { UpdateUserDto } from './dto/updateUserDto.js';
import { UserRepository } from './user.repository.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly repoService: UserRepository) {}

  getAllUsers() {
    return this.repoService.getAllUsers();
  }

  getUserById(id: number) {
    return this.repoService.getUserById(id);
  }

  getUserByWhatsApp(whatsApp: string) {
    return this.repoService.getUserByWhatsApp(whatsApp);
  }

  async createUser(body: CreateUserDto) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const data: UserCreateInput = {
      name: body.name,
      address: body.address,
      email: body.email,
      whatsApp: body.whatsApp,
      phoneNo: body.phoneNo,
      role: body.role,
      passwordHash,
    };

    return this.repoService.createUser(data);
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const data: UserUpdateInput = {
      name: body.name,
      address: body.address,
      whatsApp: body.whatsApp,
      role: body.role,
      phoneNo: body.phoneNo,
      isVerified: body.isVerified,
    };
    console.log('service', data.isVerified);

    return this.repoService.updateUser(id, data);
  }

  async deleteUser(id: number) {
    await this.repoService.deleteUser(id);
    return {
      message: 'User deleted successfully',
    };
  }
}

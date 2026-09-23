import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  register(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        whatsApp: true,
        phoneNo: true,
        address: true,
      },
    });
  }
}

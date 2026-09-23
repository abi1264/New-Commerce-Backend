import { PrismaService } from '../prisma/prisma.service.js';
import {
  UserCreateInput,
  UserUpdateInput,
} from '../../generated/prisma/models.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUsers() {
    return this.prismaService.user.findMany();
  }

  getUserById(idd: number) {
    return this.prismaService.user.findUnique({
      where: { id: idd }, //it checks the passed idd i.e passed id with the actual database id
    });
  }

  getUserByWhatsApp(whatsApp: string) {
    return this.prismaService.user.findUnique({
      where: { whatsApp },
    });
  }

  createUser(data: UserCreateInput) {
    return this.prismaService.user.create({
      data,
    });
  }

  updateUser(idd: number, body: UserUpdateInput) {
    return this.prismaService.user.update({
      where: { id: idd },
      data: body,
    });
  }

  deleteUser(idd: number) {
    return this.prismaService.user.delete({
      where: { id: idd },
    });
  }
}

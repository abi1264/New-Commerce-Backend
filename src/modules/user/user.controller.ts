import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/createUserDto.js';
import { UpdateUserDto } from './dto/updateUserDto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdminRoleGuard } from '../auth/guards/role.guard.js';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.getUserById(Number(id));
  }

  @UseGuards(AdminRoleGuard)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UseGuards(AdminRoleGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(Number(id), body);
  }

  @UseGuards(AdminRoleGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }
}

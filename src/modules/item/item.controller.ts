import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service.js';
import { CreateItemDto } from './dto/createItemDto.js';
import { UpdateItemDto } from './dto/updateItemDto.js';
import {
  AdminOrSellerRoleGuard,
  AdminRoleGuard,
  SellerRoleGuard,
} from '../auth/guards/role.guard.js';
import type { Request } from 'express';

@Controller('item')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll() {
    return await this.itemService.getAllItems();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.getItemById(Number(id));
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.itemService.getByCategory(Number(categoryId));
  }

  @Get('user/:userId')
  async findByuser(@Param('userId') userId: string) {
    return await this.itemService.getByUser(Number(userId));
  }

  @UseGuards(AdminOrSellerRoleGuard)
  @Post()
  async CreateItem(@Body() body: CreateItemDto, @Req() req: Request) {
    const loggedUserId = req.user.sub;
    return await this.itemService.createItem(loggedUserId, body);
  }

  @UseGuards(SellerRoleGuard, AdminRoleGuard)
  @Patch(':id')
  async updateItem(@Param('id') id: string, @Body() body: UpdateItemDto) {
    return await this.itemService.updateItem(Number(id), body);
  }

  @UseGuards(SellerRoleGuard, AdminRoleGuard)
  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(Number(id));
  }
}

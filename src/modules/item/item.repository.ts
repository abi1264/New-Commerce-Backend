import { PrismaService } from '../prisma/prisma.service.js';
import {
  ItemCreateInput,
  ItemUpdateInput,
} from '../../generated/prisma/models.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAllItems() {
    return this.prismaService.item.findMany({
      include: {
        category: true,
        user: true,
      },
    });
  }

  getItemById(idd: number) {
    return this.prismaService.item.findUnique({
      where: { id: idd }, //it checks the passed idd i.e passed id with the actual database id
    });
  }

  getByCategory(categoryIdd: number) {
    return this.prismaService.item.findMany({
      where: {
        categoryId: categoryIdd,
      },
    });
  }

  getByUser(userId: number) {
    return this.prismaService.item.findMany({
      where: {
        userId,
      },
    });
  }

  createItem(data: ItemCreateInput) {
    return this.prismaService.item.create({
      data,
    });
  }

  updateItem(idd: number, body: ItemUpdateInput) {
    return this.prismaService.item.update({
      where: { id: idd },
      data: body,
    });
  }

  deleteItem(idd: number) {
    return this.prismaService.item.delete({
      where: { id: idd },
    });
  }
}

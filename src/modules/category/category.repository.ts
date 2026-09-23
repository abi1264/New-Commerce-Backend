import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '../../generated/prisma/models.js';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  getAllCategories() {
    return this.prismaService.category.findMany();
  }

  getCategoryById(idd: number) {
    return this.prismaService.category.findUnique({
      where: { id: idd },
    });
  }

  createCategory(data: CategoryCreateInput) {
    console.log(data);
    return this.prismaService.category.create({
      data,
    });
  }

  updateCategory(idd: number, body: CategoryUpdateInput) {
    return this.prismaService.category.update({
      where: { id: idd },
      data: body,
    });
  }

  deleteCategory(idd: number) {
    return this.prismaService.category.delete({
      where: { id: idd },
    });
  }
}

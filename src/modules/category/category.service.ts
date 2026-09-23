import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository.js';
import { CreateCategoryDto } from './dto/createCategoryDto.js';
import {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '../../generated/prisma/models.js';

import { UpdateCategoryDto } from './dto/updateCategoryDto.js';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryService: CategoryRepository) {}

  getAllCategory() {
    return this.categoryService.getAllCategories();
  }

  getCategoryById(id: number) {
    return this.categoryService.getCategoryById(id);
  }

  createCategory(body: CreateCategoryDto) {
    const data: CategoryCreateInput = {
      name: body.name,
      description: body.description,
    };
    return this.categoryService.createCategory(data);
  }
  updateCategory(id: number, body: UpdateCategoryDto) {
    const data: CategoryUpdateInput = {
      name: body.name,
      description: body.description,
    };
    return this.categoryService.updateCategory(id, data);
  }

  deleteCategory(id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

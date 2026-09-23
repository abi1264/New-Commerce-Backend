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
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/createCategoryDto.js';
import { UpdateCategoryDto } from './dto/updateCategoryDto.js';
import { AdminRoleGuard } from '../auth/guards/role.guard.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoryService.getAllCategory();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.getCategoryById(Number(id));
  }

  @UseGuards(AdminRoleGuard)
  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    return await this.categoryService.createCategory(body);
  }

  @UseGuards(AdminRoleGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(Number(id), body);
  }

  @UseGuards(AdminRoleGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(Number(id));
  }
}

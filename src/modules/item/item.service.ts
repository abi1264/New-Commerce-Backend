import { Injectable } from '@nestjs/common';
import {
  ItemCreateInput,
  ItemUpdateInput,
} from '../../generated/prisma/models.js';
import { ItemRepository } from './item.repository.js';
import { CreateItemDto } from './dto/createItemDto.js';
import { UpdateItemDto } from './dto/updateItemDto.js';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  getAllItems() {
    return this.itemRepository.getAllItems();
  }

  getItemById(id: number) {
    return this.itemRepository.getItemById(id);
  }

  getByCategory(CategoryId: number) {
    return this.itemRepository.getByCategory(CategoryId);
  }

  getByUser(userId: number) {
    return this.itemRepository.getByUser(userId);
  }

  createItem(userId: number, body: CreateItemDto) {
    const data: ItemCreateInput = {
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      isActive: body.isActive,
      discount: body.discount,
      quantity: body.quantity,
      category: {
        connect: {
          id: body.categoryId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.itemRepository.createItem(data);
  }

  updateItem(id: number, body: UpdateItemDto) {
    const data: ItemUpdateInput = {
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      isActive: body.isActive,
      discount: body.discount,
      category: {
        connect: {
          id: body.categoryId,
        },
      },
    };
    return this.itemRepository.updateItem(id, data);
  }

  deleteItem(id: number) {
    return this.itemRepository.deleteItem(id);
  }
}

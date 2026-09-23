import { PrismaModule } from '../prisma/prisma.module.js';
import { ItemsController } from './item.controller.js';
import { ItemRepository } from './item.repository.js';
import { ItemService } from './item.service.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [ItemRepository, ItemService],
})
export class ItemModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { UserModule } from './modules/user/user.module.js';
import { ItemModule } from './modules/item/item.module.js';
import { CategoryModule } from './modules/category/category.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard.js';

@Module({
  imports: [PrismaModule, UserModule, ItemModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AppService],
})
export class AppModule {}

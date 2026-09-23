import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { Role } from '../../../generated/prisma/enums.js';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.user && request.user.role === Role.ADMIN) {
      return true;
    }

    return false;
  }
}

export class SellerRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.user && request.user.role === Role.SELLER) {
      return true;
    }

    return false;
  }
}

export class CustomerRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.user && request.user.role === Role.CUSTOMER) {
      return true;
    }

    return false;
  }
}

export class AdminOrSellerRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      (request.user && request.user.role === Role.ADMIN) ||
      (request.user && request.user.role === Role.SELLER)
    ) {
      return true;
    }

    return false;
  }
}

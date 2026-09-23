import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../generated/prisma/enums.js';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  whatsApp?: string;

  @IsOptional()
  @IsString()
  phoneNo?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

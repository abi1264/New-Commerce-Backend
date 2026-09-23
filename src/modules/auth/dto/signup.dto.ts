import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../../../generated/prisma/enums.js';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Name must be atleast 2 characters long' })
  @MaxLength(50, { message: 'Name must not have more than 50 characters' })
  name!: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(4, { message: 'Password must be atleast 4 characters long' })
  password!: string;

  @IsString()
  phoneNo?: string;

  @IsString()
  whatsApp: string;

  @IsString()
  address: string;

  @IsEnum(Role)
  role: Role;
}

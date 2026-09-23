import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  whatsApp!: string;

  @IsString()
  password!: string;
}

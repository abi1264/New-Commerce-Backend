import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsInt()
  price!: number;

  @IsOptional()
  @IsString()
  imageUrl!: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    return value.toLowerCase() === 'yes';
  })
  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  discount!: string;

  @IsOptional()
  quantity!: number;

  @IsOptional()
  @IsInt()
  categoryId!: number;
}

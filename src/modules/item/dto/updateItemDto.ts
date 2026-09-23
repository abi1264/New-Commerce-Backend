import { IsBoolean, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateItemDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsInt()
  price!: number;

  @IsString()
  imageUrl!: string;

  @Transform(({ value }: { value: string }) => {
    return value.toLowerCase() === 'yes';
  })
  @IsBoolean()
  isActive!: boolean;

  discount!: string;

  quantity!: number;

  @IsInt()
  categoryId!: number;
}

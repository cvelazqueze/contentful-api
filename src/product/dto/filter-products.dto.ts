import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProductsDto {
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @Type(() => Number)
  @IsOptional()
  minPrice?: number;

  @Type(() => Number)
  @IsOptional()
  maxPrice?: number;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class CarSelectionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cost: number;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CarSelectionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsNumber()
  @Transform((value: any) => parseInt(value, 10))
  year: number;

  @IsOptional()
  @IsNumber()
  @Transform((value: any) => parseFloat(value))
  cost: number;
}

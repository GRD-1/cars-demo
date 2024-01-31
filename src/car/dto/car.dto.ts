import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNumber()
  year: number;

  @IsNumber()
  cost: number;
}

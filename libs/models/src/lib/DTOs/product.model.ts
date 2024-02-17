import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductModel {
  @ApiProperty({ example: 1, description: 'Product identifier' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Laptop', description: "Product's name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 100, description: "Product's value" })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ example: 10, description: "Product's amount" })
  @IsNotEmpty()
  @IsInt()
  amount: number;
}

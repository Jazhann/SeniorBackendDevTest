import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from './product.model';
import { IsInt, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderModel {
  @ApiProperty({ example: 1, description: 'Order identifier' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    example: [
      {
        id: 4,
        name: 'Laptop',
        value: 100,
        amount: 1,
      },
    ],
    description: 'Order products list',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => ProductModel)
  products: ProductModel[];

  @ApiProperty({ example: '2023-10-04', description: 'Order Date' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1, description: 'User identifier' })
  user: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Total price' })
  total: number;
}

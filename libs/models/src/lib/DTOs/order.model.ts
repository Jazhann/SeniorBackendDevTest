import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from './product.model';

export class OrderModel {
  @ApiProperty({ example: 1, description: 'Order identifier' })
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
  products: ProductModel[];

  @ApiProperty({ example: '2023-10-04', description: 'Product identifier' })
  date: Date;

  @ApiProperty({ example: 1, description: 'Product identifier' })
  user: number;

  @ApiProperty({ example: 1, description: 'Product identifier' })
  total: number;
}

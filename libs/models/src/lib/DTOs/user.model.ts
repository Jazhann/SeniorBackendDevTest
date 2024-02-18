import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from './order.model';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserModel {
  @ApiProperty({ example: 1, description: 'User identifier' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '0982345POIJSDF0', description: 'User password encrypted' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'johndoe@email.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: [], description: 'User orders list' })
  @IsArray()
  orders: OrderModel[] | number[];
}

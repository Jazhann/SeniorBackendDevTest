import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginModel {
  @ApiProperty({ example: 'johndoe@email.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

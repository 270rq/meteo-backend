import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { ISignIn } from '../interface/signIn';

export class SignInDto implements ISignIn {
  passwors: string;
  @ApiProperty({ example: 'main@mail.ru', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'User password' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}

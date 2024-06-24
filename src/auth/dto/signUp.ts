import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { ISignUp } from '../interface/signUp';

export class SignUpDto implements ISignUp {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
    maxLength: 20,
  })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}

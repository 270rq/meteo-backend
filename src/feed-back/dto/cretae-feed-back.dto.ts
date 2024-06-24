import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Привет' })
  @IsString()
  message: string;
}

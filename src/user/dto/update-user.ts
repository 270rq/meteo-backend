import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from './create-user';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  flowerId?: number;
  @ApiProperty({ example: 'SuperHuman' })
  @IsString()
  @IsOptional()
  nickname?: string;
  @ApiProperty({ example: false })
  @IsBoolean()
  receive_notifications?: boolean;
  @ApiProperty({ example: 57.89 })
  @IsNumber()
  @IsOptional()
  x?: number;
  @ApiProperty({ example: 57.909 })
  @IsNumber()
  @IsOptional()
  y?: number;
}

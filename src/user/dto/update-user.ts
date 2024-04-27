import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  flowerId?: number;
  @ApiProperty({ example: 'SuperHuman' })
  @IsString()
  nickname?: string;
  @ApiProperty({ example: false })
  @IsBoolean()
  receive_notifications?: boolean;
  @ApiProperty({ example: 57.89 })
  @IsNumber()
  x?: number;
  @ApiProperty({ example: 57.909 })
  @IsNumber()
  y?: number;
}

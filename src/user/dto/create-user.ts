import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsString,
  isNotEmpty,
} from 'class-validator';
import { IUser } from '../interface/create-user.interface';
import { TUserRoles } from 'src/enum/user-role';

export class CreateUserDto implements IUser {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 1 })
  @IsInt()
  flowerId?: number;
  @ApiProperty()
  role: TUserRoles;
  @ApiProperty()
  @IsString()
  password: string;
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

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt } from 'class-validator';
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
}

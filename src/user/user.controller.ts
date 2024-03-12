import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './interface/create-user.interface';
import { UserRoles } from 'src/enum/user-role';
import { Roles } from 'decorators/roles-key';
import { SignUpDto } from 'src/auth/dto/signUp';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRoles.superAdmin)
  @Post()
  async createAdmin(@Body() user: SignUpDto) {
    return this.userService.createAdmin(user);
  }
  @Post()
  async createUser(@Body() user: SignUpDto) {
    return this.userService.createUser(user);
  }

  @Get()
  async findAndCount() {
    return this.userService.findAndCount();
  }

  @Get(':mail')
  async findOneByEmail(@Param('mail') mail: string) {
    return this.userService.findOneByEmail(mail);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: IUser) {
    return this.userService.updateUser(id, user);
  }
}

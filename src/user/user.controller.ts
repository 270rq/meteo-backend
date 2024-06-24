import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto/signUp';
import { UpdateUserDto } from './dto/update-user';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createAdmin')
  async createAdmin(@Body() user: SignUpDto) {
    return this.userService.createAdmin(user);
  }

  @Get()
  async findAndCount() {
    return this.userService.findAndCount();
  }

  @Get('mail/:mail')
  async findOneByEmail(@Param('mail') mail: string) {
    return this.userService.findOneByEmail(mail);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

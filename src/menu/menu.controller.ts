import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { Roles } from 'decorators/roles-key';

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('byId/:id')
  async getFlowerById(@Param(':id') id: number) {
    return this.menuService.getById(id);
  }

  @Get('getAll')
  async getAll() {
    return this.menuService.getAll();
  }

  @Post()
  async createMenu(@Body() data: MenuDto) {
    return this.menuService.createMenu(data);
  }

  @Put('forsuperAdmin/:id')
  @Roles('SuperAdmin')
  async updateSunForSuperAdmin(@Param('id') id: number, @Body() data: MenuDto) {
    return this.menuService.updateSunForSuperAdmin(id, data);
  }

  @Delete('forsuperAdmin/:id')
  @Roles('SuperAdmin')
  async removeSunForSuperAdmin(@Param('id') id: number) {
    return this.menuService.removeSunForSuperAdmin(id);
  }

  @Put('forAdmin/:id')
  @Roles('admin')
  async updateSunForAdmin(@Param('id') id: number, @Body() data: MenuDto) {
    return this.menuService.updateSunForAdmin(id, data);
  }

  @Delete('forAdmin/:id')
  @Roles('admin')
  async removeSunForAdmin(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ) {
    return this.menuService.removeSunForAdmin(id, userId);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: number, @Query('limit') limit: number) {
    return this.menuService.getPage(page, limit);
  }
}

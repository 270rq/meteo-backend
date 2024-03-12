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

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':id')
  async getFlowerById(@Param('id') id: number) {
    return this.menuService.getById(id);
  }

  @Get()
  async findAll() {
    return this.menuService.getAll();
  }

  @Post()
  async createMenu(@Body() data: MenuDto) {
    return this.menuService.createMenu(data);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: number, @Body() data: MenuDto) {
    return this.menuService.updateMenu(id, data);
  }

  @Delete(':id')
  async removeMenu(@Param('id') id: number) {
    return this.menuService.removeMenu(id);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: number, @Query('limit') limit: number) {
    return this.menuService.getPage(page, limit);
  }
}

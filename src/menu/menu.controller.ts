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

  @Get('byId/:id')
  async getFlowerById(@Param(':id') id: number) {
    return this.menuService.getById(id);
  }

  @Get('getAll')
  async getAll() {
    return this.menuService.getAll();
  }

  @Get(':regionName/:cityName')
  async getWeatherForDay(
    @Param('regionName') regionName: string,
    @Param('cityName') cityName: string,
  ) {
    const weatherData = await this.menuService.getWeatherForDay(
      regionName,
      cityName,
    );
    return weatherData;
  }
  @Post()
  async createMenu(@Body() data: MenuDto) {
    return this.menuService.createMenu(data);
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: number,
    @Body() data: MenuDto,
    @Body('createrUserId') createrUserId: number,
  ) {
    return this.menuService.updateMenu(id, createrUserId, data);
  }

  @Delete(':id')
  async removeMenu(
    @Param('id') id: number,
    @Body('createrUserId') createrUserId: number,
  ) {
    return this.menuService.removeMenu(id, createrUserId);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: number, @Query('limit') limit: number) {
    return this.menuService.getPage(page, limit);
  }
}

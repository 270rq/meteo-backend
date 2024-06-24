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
import { MenuFiveDaysDto } from './dto/menu-five-days.dto';
import { ReqPageMenuDto } from './dto/req.menu.page.dto';

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

  @Get('getWeather/:regionName/:cityName/:date')
  async getWeather(
    @Param('regionName') regionName: string,
    @Param('cityName') cityName: string,
    @Param('date') date: Date,
  ) {
    return this.menuService.getAllInformation(regionName, cityName, date);
  }

  @Get(':regionName/:cityName/:date')
  async getWeatherForDay(
    @Param('regionName') regionName: string,
    @Param('cityName') cityName: string,
    @Param('date') date: Date,
  ) {
    const weatherData = await this.menuService.getWeatherForDay(
      regionName,
      cityName,
      new Date(date),
    );
    return weatherData;
  }

  @Get('five-days/:regionName/:cityName/:date')
  async getWeatherForFiveDays(
    @Param('regionName') regionName: string,
    @Param('cityName') cityName: string,
    @Param('date') date: Date,
  ): Promise<MenuFiveDaysDto[]> {
    return this.menuService.getWeatherForFiveDays(regionName, cityName, date);
  }

  @Get('hour/:regionName/:cityName/:date')
  async getWeatherForHour(
    @Param('regionName') regionName: string,
    @Param('cityName') cityName: string,
    @Param('date') date: Date,
  ): Promise<MenuFiveDaysDto[]> {
    return this.menuService.getHourlyWeather(regionName, cityName, date);
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

  @Put('page/:page')
  async getPage(
    @Body() params: ReqPageMenuDto,
    @Param('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.menuService.getPage(page, limit, params.where, params.order);
  }
}

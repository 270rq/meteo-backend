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
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';
import { config } from 'config/config';

@Controller('map')
@ApiTags('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get(':id')
  async getFlowerById(@Param('id') id: number) {
    return this.mapService.getById(id);
  }

  @Get('flower/:date')
  async geyByFlowerAndTime(
    @Param('id') flowerId?: number,
    @Query('date') date?: Date | null,
  ) {
    return this.mapService.geyByFlowerAndTime(flowerId, date);
  }

  @Post('getAll')
  async getAll() {
    return this.mapService.getAll();
  }

  @Post()
  async createMap(@Body() data: MapDto) {
    return this.mapService.createMap(data);
  }

  @Put(':id')
  async updateFlower(@Param('id') id: number, @Body() data: MapDto) {
    return this.mapService.updateMap(id, data);
  }

  @Delete(':id')
  async removeFlower(@Param('id') id: number) {
    return this.mapService.removeMap(id);
  }

  @Get('location/:lat-:long')
  async getLocationData(
    @Param('lat') lat: string,
    @Param('long') long: string,
  ) {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${config.yandexApiKey}&geocode=${lat},${long}&lang=ru&format=json`,
    );
    return response.json();
  }
}

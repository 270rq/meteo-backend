import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';

@Controller('map')
@ApiTags('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get(':id')
  async getFlowerById(@Param('id') id: number) {
    return this.mapService.getById(id);
  }

  @Post('getAll')
  async getAll(@Body() data: MapDto) {
    console.log(data);
    return this.mapService.getAll(data);
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
}

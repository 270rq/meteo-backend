import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('city')
@ApiTags('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.cityService.getById(id);
  }
  @Get()
  async getAll() {
    return this.cityService.getAll();
  }
}

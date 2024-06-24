import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';

@Controller('region')
@ApiTags('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.regionService.getById(id);
  }
  @Get()
  async getAll() {
    return this.regionService.getAll();
  }
}

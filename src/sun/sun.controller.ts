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
import { SunService } from './sun.service';
import { SunDto } from './dto/sun.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sun')
@ApiTags('sun')
export class SunController {
  constructor(private readonly sunService: SunService) {}
  @Get(':id')
  async getFlowerById(@Param('id') id: number) {
    return this.sunService.getById(id);
  }

  @Get()
  async findAll() {
    return this.sunService.getAll();
  }

  @Post()
  async createSun(@Body() data: SunDto) {
    return this.sunService.createSun(data);
  }

  @Put(':id')
  async updateSun(@Param('id') id: number, @Body() data: SunDto) {
    return this.sunService.updateSun(id, data);
  }

  @Delete(':id')
  async removeSun(@Param('id') id: number, @Query('userId') userId: number) {
    return this.sunService.removeSun(id, userId);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: number, @Query('limit') limit: number) {
    return this.sunService.getPage(page, limit);
  }
}

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
import { FlowerService } from './flower.service';
import { FlowerDto } from './dto/flower.dto';

@Controller('flower')
@ApiTags('flower')
export class FlowerController {
  constructor(private readonly flowerService: FlowerService) {}

  @Get(':id')
  async getFlowerById(@Param('id') id: number) {
    return this.flowerService.getById(id);
  }

  @Get()
  async findAll() {
    return this.flowerService.getAll();
  }

  @Post()
  async createFlower(@Body() data: FlowerDto) {
    return this.flowerService.createFlower(data);
  }

  @Put(':id')
  async updateFlower(@Param('id') id: number, @Body() data: FlowerDto) {
    return this.flowerService.updateFlower(id, data);
  }

  @Delete(':id')
  async removeFlower(@Param('id') id: number) {
    return this.flowerService.removeFlower(id);
  }
}

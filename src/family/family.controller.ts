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
import { FamilyService } from './family.service';
import { FamilyDto } from './dto/family.dto';

@Controller('family')
@ApiTags('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get(':id')
  async getFamilyById(@Param('id') id: number) {
    return this.familyService.getById(id);
  }

  @Get()
  async findAll() {
    return this.familyService.getAll();
  }

  @Post()
  async createFamily(@Body() data: FamilyDto) {
    return this.familyService.createFamily(data);
  }

  @Put(':id')
  async updateFamily(@Param('id') id: number, @Body() data: FamilyDto) {
    return this.familyService.updateFamily(id, data);
  }

  @Delete(':id')
  async removeFamily(@Param('id') id: number) {
    return this.familyService.removeFamily(id);
  }
}

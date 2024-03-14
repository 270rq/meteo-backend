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
import { Roles } from 'decorators/roles-key';

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

  @Put('forsuperAdmin/:id')
  @Roles('SuperAdmin')
  async updateSunForSuperAdmin(@Param('id') id: number, @Body() data: SunDto) {
    return this.sunService.updateSunForSuperAdmin(id, data);
  }

  @Delete('forsuperAdmin/:id')
  @Roles('SuperAdmin')
  async removeSunForSuperAdmin(@Param('id') id: number) {
    return this.sunService.removeSunForSuperAdmin(id);
  }

  @Put('forAdmin/:id')
  @Roles('admin')
  async updateSunForAdmin(@Param('id') id: number, @Body() data: SunDto) {
    return this.sunService.updateSunForAdmin(id, data);
  }

  @Delete('forAdmin/:id')
  @Roles('admin')
  async removeSunForAdmin(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ) {
    return this.sunService.removeSunForAdmin(id, userId);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: number, @Query('limit') limit: number) {
    return this.sunService.getPage(page, limit);
  }
}

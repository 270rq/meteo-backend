import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { MapDto } from './dto/map.dto';
import { IMap } from './interface/map.interface';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async createMap(data: MapDto) {
    return this.prisma.map.createMany({
      data: data.cord.map((coord) => ({
        day: data.day,
        flowerId: data.flowerId,
        x: coord.x,
        y: coord.y,
        lvl: data.lvl,
        createrUserId: data.createrUserId,
      })),
    });
  }

  async getAll() {
    return this.prisma.map.findMany({ include: { flower: true } });
  }

  async getById(id: number) {
    return this.prisma.map.findUnique({
      where: { id },
    });
  }

  async updateMap(id: number, data: IMap) {
    return this.prisma.map.update({
      where: { id },
      data,
    });
  }

  async removeMap(id: number) {
    return this.prisma.map.delete({
      where: { id },
    });
  }
}

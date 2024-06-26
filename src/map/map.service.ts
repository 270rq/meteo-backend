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
        date: data.date,
        flowerId: data.flowerId,
        x: coord.x,
        y: coord.y,
        lvl: data.lvl,
      })),
    });
  }

  async getAll() {
    return this.prisma.map.findMany({ include: { flower: true } });
  }

  async getById(id: number) {
    id = Number(id);
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

  async geyByFlowerAndTime(
    flowerId = 0,
    date: Date | null,
    userLocation: { lat: number; lon: number } = { lat: 0, lon: 0 },
    check = false,
  ) {
    let whereParam = {};

    if (flowerId) {
      whereParam = { flowerId: Number(flowerId) };
    }
    if (check) {
      whereParam = {
        ...whereParam,
        x: { gte: userLocation.lat - 0.09, lte: userLocation.lat + 0.09 },
        y: { gte: userLocation.lon - 0.09, lte: userLocation.lon + 0.09 },
      };
    }
    date = new Date(date);
    console.log(date.getTime());
    if (date.getTime()) {
      const startDate = new Date(date);
      startDate.setTime(startDate.getTime() - 30 * 60 * 1000);
      const endDate = new Date(date);
      endDate.setTime(endDate.getTime() + 30 * 60 * 1000);
      console.log(startDate, endDate);

      whereParam = {
        ...whereParam,
        date: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    return this.prisma.map.findMany({
      where: whereParam,
      include: { flower: true },
    });
  }
}

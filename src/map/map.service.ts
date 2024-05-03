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
        createdAt: data.createdAt,
        date: data.date,
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

  async geyByFlowerAndTime(flowerId = 0, date: Date | null) {
    let whereParam = {};

    if (flowerId) {
      whereParam = { flowerId: Number(flowerId) };
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
    });
  }

  async getAllergenInfo(
    userLocation: { lat: number; lon: number },
    date: Date,
  ) {
    const analysisStartTime = new Date(date);
    analysisStartTime.setHours(9, 0, 0, 0);
    const analysisEndTime = new Date(date);
    analysisEndTime.setHours(9, 0, 0, 0);
    analysisEndTime.setDate(analysisEndTime.getDate() + 1);

    const mapPoints = await this.prisma.map.findMany({
      where: {
        AND: [
          {
            x: { gte: userLocation.lat - 0.09, lte: userLocation.lat + 0.09 },
            y: { gte: userLocation.lon - 0.09, lte: userLocation.lon + 0.09 },
          },
          {
            date: {
              gte: analysisStartTime,
              lt: analysisEndTime,
            },
          },
        ],
      },
    });

    let allergenIncrease = 0;
    for (const point of mapPoints) {
      allergenIncrease += point.lvl;
    }

    let allergenInfo = '';
    if (allergenIncrease > 0) {
      allergenInfo = `Allergen levels have increased by ${allergenIncrease} units near your location.`;
    } else {
      allergenInfo = `Allergen levels have not increased near your location.`;
    }

    return allergenInfo;
  }
}

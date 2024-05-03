import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ISun } from './interface/sun.interface';

@Injectable()
export class SunService {
  constructor(private readonly prisma: PrismaService) {}

  async createSun(data: ISun) {
    const date = new Date(data.date);
    date.setHours(3, 0, 0);
    const sun = await this.prisma.sun.findFirst({
      where: {
        date: date,
        cityId: data.cityId,
      },
    });
    if (sun) {
      return this.prisma.sun.update({
        where: { id: sun.id },
        data: {
          // date: date,
          // cityId: data.cityId,
          // city: { connect: { id: data.cityId } },
          sunset: data.sunset,
          sunrise: data.sunrise,
        },
      });
    }
    return this.prisma.sun.create({
      data: {
        date: date,
        cityId: data.cityId,
        sunset: data.sunset,
        sunrise: data.sunrise,
        createrUserId: data.createrUserId,
      },
    });
  }

  async getSunDataForCity(cityName: string, regionName: string, date: Date) {
    const dateParsed = new Date(date);
    const startDate = new Date(dateParsed);
    startDate.setDate(startDate.getDate() - 1); // Вычитаем один день
    startDate.setHours(23, 59, 59, 999); // Устанавливаем время на 23:59:// Set time to midnight

    const endDate = new Date(dateParsed);
    endDate.setHours(23, 59, 59, 999); // Set time to end of day
    const sunData = await this.prisma.sun.findMany({
      where: {
        city: {
          name: cityName,
          region: {
            name: regionName,
          },
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return sunData;
  }

  async getAll() {
    return this.prisma.sun.findMany({
      include: { city: { include: { region: true } } },
    });
  }

  async getById(id: number) {
    id = Number(id);
    return this.prisma.sun.findUnique({
      where: { id },
    });
  }

  async updateSun(id: number, data: ISun, userId?: number) {
    id = Number(id);
    if (userId && !(await this.isUsersSun(userId, id))) {
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );
    }

    return this.prisma.sun.update({
      where: { id },
      data,
    });
  }

  async removeSun(id: number, userId: number) {
    id = Number(id);
    if (userId) {
      if (await this.isUsersSun(userId, id)) {
        return this.prisma.sun.delete({
          where: { id: id },
        });
      } else {
        throw new ForbiddenException(
          `You are not allowed to perform this action`,
        );
      }
    } else {
      return this.prisma.sun.delete({
        where: { id: id },
      });
    }
  }

  async isUsersSun(userId: number, sunId: number): Promise<boolean> {
    const sun = await this.prisma.sun.findUnique({
      where: { id: sunId },
      select: { createrUserId: true },
    });

    if (sun && sun.createrUserId === userId) {
      return true;
    } else {
      return false;
    }
  }

  async getPage(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.sun.count();
    const totalPages = Math.ceil(totalCount / limit);
    const rows = await this.prisma.sun.findMany({
      skip: skip,
      take: limit,
    });

    return {
      infoPage: {
        page: page,
        pageSize: limit,
        totalCount: totalCount,
        totalPages: totalPages,
      },
      rows: rows,
    };
  }
}

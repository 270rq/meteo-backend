import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ISun } from './interface/sun.interface';

@Injectable()
export class SunService {
  constructor(private readonly prisma: PrismaService) {}

  async createSun(data: ISun) {
    return this.prisma.sun.create({
      data: {
        date: data.date,
        cityId: data.cityId,
        sunset: data.sunset,
        sunrise: data.sunrise,
        createrUserId: data.createrUser,
      },
    });
  }

  async getAll() {
    return this.prisma.sun.findMany({ include: { city: true } });
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

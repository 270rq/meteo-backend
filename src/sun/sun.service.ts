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
    return this.prisma.sun.findUnique({
      where: { id },
    });
  }

  async updateSunForSuperAdmin(id: number, data: ISun) {
    return this.prisma.sun.update({
      where: { id },
      data,
    });
  }

  async removeSunForSuperAdmin(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async updateSunForAdmin(id: number, data: ISun) {
    if (this.isUsersSun(data.createrUser, id)) {
      return this.prisma.sun.update({
        where: { id },
        data,
      });
    }
    throw new ForbiddenException('You are not allowed to perform this action');
  }

  async removeSunForAdmin(id: number, userId: number) {
    if (this.isUsersSun(userId, id)) {
      return this.prisma.menu.delete({
        where: { id },
      });
    }
    throw new ForbiddenException(`You are not allowed to perform this action`);
  }

  async isUsersSun(userId: number, sunId: number): Promise<boolean> {
    const sun = await this.prisma.sun.findUnique({
      where: { id: sunId },
      select: { createrUserId: true },
    });
    return sun.createrUserId === userId;
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ISun } from './interface/sun.interface';

@Injectable()
export class SunService {
  constructor(private readonly prisma: PrismaService) {}

  async createSun(data: ISun) {
    return this.prisma.sun.create({
      data,
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

  async updateSun(id: number, data: ISun) {
    return this.prisma.sun.update({
      where: { id },
      data,
    });
  }

  async removeSun(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
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

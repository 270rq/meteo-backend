import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { IMenu } from './interface/menu.interface';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async createMenu(data: IMenu) {
    return this.prisma.menu.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.menu.findMany({
      include: { city: { include: { region: true } } },
    });
  }

  async getById(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
    });
  }

  async updateSunForSuperAdmin(id: number, data: IMenu) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async removeSunForSuperAdmin(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async updateSunForAdmin(id: number, data: IMenu) {
    if (this.isUsersMenu(data.createrUserId, id)) {
      return this.prisma.menu.update({
        where: { id },
        data,
      });
    }
    throw new ForbiddenException('You are not allowed to perform this action');
  }

  async removeSunForAdmin(id: number, userId: number) {
    if (this.isUsersMenu(userId, id)) {
      return this.prisma.menu.delete({
        where: { id },
      });
    }
    throw new ForbiddenException(`You are not allowed to perform this action`);
  }

  async isUsersMenu(userId: number, sunId: number): Promise<boolean> {
    const sun = await this.prisma.menu.findUnique({
      where: { id: sunId },
      select: { createrUserId: true },
    });
    return sun.createrUserId === userId;
  }

  async getPage(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.menu.count();
    const totalPages = Math.ceil(totalCount / limit);
    const rows = await this.prisma.menu.findMany({
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

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

  async updateMenu(id: number, userId: number, dataToUpdate: IMenu) {
    if (userId) {
      if (await this.isUsersMenu(userId, id)) {
        return this.prisma.menu.update({
          where: { id: id },
          data: dataToUpdate,
        });
      } else {
        throw new ForbiddenException(
          `You are not allowed to perform this action`,
        );
      }
    } else {
      return this.prisma.menu.update({
        where: { id: id },
        data: dataToUpdate,
      });
    }
  }

  async removeMenu(id: number, userId: number) {
    if (userId) {
      if (await this.isUsersMenu(userId, id)) {
        return this.prisma.menu.delete({
          where: { id: id },
        });
      } else {
        throw new ForbiddenException(
          `You are not allowed to perform this action`,
        );
      }
    } else {
      return this.prisma.menu.delete({
        where: { id: id },
      });
    }
  }

  async isUsersMenu(userId: number, menuId: number): Promise<boolean> {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      select: { createrUserId: true },
    });
    return menu.createrUserId === userId;
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

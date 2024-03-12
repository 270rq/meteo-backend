import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { IFamily } from './interface/family.interface';

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async createFamily(data: IFamily) {
    return this.prisma.family.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.family.findMany({ include: { flower: true } });
  }

  async getById(id: number) {
    return this.prisma.family.findUnique({
      where: { id },
    });
  }

  async updateFamily(id: number, data: IFamily) {
    return this.prisma.family.update({
      where: { id },
      data,
    });
  }

  async removeFamily(id: number) {
    return this.prisma.family.delete({
      where: { id },
    });
  }
}

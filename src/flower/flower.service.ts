import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { IFlower } from './interface/flower.interaface';

@Injectable()
export class FlowerService {
  constructor(private readonly prisma: PrismaService) {}

  async createFlower(data: IFlower) {
    return this.prisma.flower.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.flower.findMany();
  }

  async getById(id: number) {
    return this.prisma.flower.findUnique({
      where: { id },
    });
  }

  async updateFlower(id: number, data: IFlower) {
    return this.prisma.flower.update({
      where: { id },
      data,
    });
  }

  async removeFlower(id: number) {
    return this.prisma.flower.delete({
      where: { id },
    });
  }
}

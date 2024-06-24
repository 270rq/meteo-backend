import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.region.findMany({ include: { city: true } });
  }

  async getById(id: number) {
    id = Number(id);
    return this.prisma.region.findUnique({
      where: { id },
    });
  }
}

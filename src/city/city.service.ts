import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.city.findMany();
  }

  async getById(id: number) {
    return this.prisma.city.findUnique({
      where: { id },
    });
  }
}

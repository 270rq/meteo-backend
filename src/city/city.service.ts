import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const cities = await this.prisma.city.findMany();
    const citiesWithRegion = await Promise.all(
      cities.map(async (city) => {
        const region = await this.prisma.region.findUnique({
          where: {
            id: city.regionId,
          },
        });

        return {
          id: city.id,
          cityName: city.name,
          regionId: region.id,
          regionName: region.name,
        };
      }),
    );

    return citiesWithRegion;
  }

  async getById(id: number) {
    id = Number(id);
    return this.prisma.city.findUnique({
      where: { id },
      include: { region: true },
    });
  }
}

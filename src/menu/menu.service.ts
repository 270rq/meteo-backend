import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { IMenu } from './interface/menu.interface';
import { SunService } from 'src/sun/sun.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly sunService: SunService,
    private readonly prisma: PrismaService,
  ) {}

  async createMenu(data: IMenu) {
    const menu = await this.prisma.menu.findFirst({
      where: { date: data.date, cityId: data.cityId },
    });
    if (menu) {
      return this.prisma.menu.update({
        data: {
          date: data.date,
          temperature: data.temperature,
          humidity: data.humidity,
          uv: data.uv,
          windSpeed: data.windSpeed,
          weatherType: data.weatherType,
          windType: data.windType,
          pressure: data.pressure,
          createrUserId: data.createrUserId,
          cityId: data.cityId,
        },
        where: { id: menu.id },
      });
    }
    return this.prisma.menu.create({
      data: {
        date: data.date,
        temperature: data.temperature,
        humidity: data.humidity,
        uv: data.uv,
        windSpeed: data.windSpeed,
        weatherType: data.weatherType,
        windType: data.windType,
        pressure: data.pressure,
        createrUserId: +data.createrUserId,
        cityId: data.cityId,
      },
    });
  }

  async getAllInformation(regionName: string, cityName: string, date: Date) {
    date = new Date(date);
    const sunData = await this.sunService.getSunDataForCity(
      cityName,
      regionName,
      date,
    );

    const menuData = await this.getWeatherForDay(regionName, cityName, date);

    const weatherForFiveDays = await this.getWeatherForFiveDays(
      regionName,
      cityName,
      date,
    );

    const weatherForFiveHours = await this.getHourlyWeather(
      regionName,
      cityName,
      date,
    );

    return {
      city: cityName,
      region: regionName,
      sunData: sunData,
      menuData: menuData,
      weatherForFiveDays: weatherForFiveDays,
      weatherForFiveHours: weatherForFiveHours,
    };
  }

  async getAll() {
    return this.prisma.menu.findMany({
      include: { city: { include: { region: true } } },
    });
  }

  async getWeatherForDay(regionName: string, cityName: string, date: Date) {
    const city = await this.prisma.city.findFirst({
      where: {
        name: cityName,
        region: { name: regionName },
      },
    });
    const data = await this.prisma.menu.findMany({
      where: {
        cityId: city.id,
        date: {
          gte: new Date(date.setHours(0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 0)),
        },
      },
    });

    return {
      city: cityName,
      region: regionName,
      data,
    };
  }

  async getWeatherForFiveDays(
    regionName: string,
    cityName: string,
    startDate: Date,
  ) {
    const parsedDate = new Date(startDate);
    parsedDate.setHours(0, 0, 0);
    console.log(parsedDate);
    const endDate = new Date(parsedDate);
    endDate.setDate(endDate.getDate() + 5);

    return this.prisma.menu.findMany({
      where: {
        city: {
          name: cityName,
          region: {
            name: regionName,
          },
        },
        date: {
          gte: parsedDate,
          lte: endDate,
        },
      },
    });
  }

  async getHourlyWeather(regionName: string, cityName: string, date: Date) {
    const city = await this.prisma.city.findFirst({
      where: {
        name: cityName,
        region: { name: regionName },
      },
    });

    if (!city) {
      return null;
    }
    const dateParsed = new Date(date);
    dateParsed.setHours(0, 0, 0);
    const hourlyWeatherData = await this.prisma.menu.findMany({
      where: {
        cityId: city.id,
        date: {
          gte: dateParsed,
          lte: new Date(dateParsed.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    return hourlyWeatherData;
  }

  async getById(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
    });
  }

  async updateMenu(id: number, userId: number, dataToUpdate: IMenu) {
    id = Number(id);
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
    id;
    if (!userId) {
      throw new ForbiddenException(`User ID is required`);
    }
    console.log(userId);
    if (await this.isUsersMenu(userId, id)) {
      return this.prisma.menu.delete({
        where: { id: +id },
      });
    } else {
      throw new ForbiddenException(
        `You are not allowed to perform this action`,
      );
    }
  }

  async isUsersMenu(userId: number, menuId: number): Promise<boolean> {
    userId = Number(userId);
    menuId = Number(menuId);
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      select: { createrUserId: true },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }
    console.log(menu.createrUserId === userId);
    return menu.createrUserId === userId;
  }

  async getPage(page: number, limit: number, where: any, order: any) {
    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.menu.count({ where: where });
    const totalPages = Math.ceil(totalCount / limit);
    const rows = await this.prisma.menu.findMany({
      include: { city: { include: { region: true } } },
      where: where,
      orderBy: order,
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

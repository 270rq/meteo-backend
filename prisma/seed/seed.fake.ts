/* eslint-disable @typescript-eslint/no-var-requires */
import { faker } from '@faker-js/faker';
import { PrismaClient, UserRoles, WindType, WeatherType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config';

const prisma = new PrismaClient();

const dayToFeel = 5;
const mapToFeel = 20;

async function clearDatabase() {
  await prisma.menu.deleteMany();
  await prisma.sun.deleteMany();
  await prisma.map.deleteMany();
  await prisma.user.delete({ where: { email: 'some@mail.com' } });
}

async function getIds(entity, where = {}) {
  const results = await entity.findMany({
    select: { id: true },
    where: where,
  });
  return results.map((el) => el.id);
}

function generateArray(count) {
  return Array.from({ length: count });
}

async function seedDatabase() {
  try {
    await clearDatabase();

    await prisma.user.create({
      data: {
        email: 'some@mail.com',
        hashPassword: bcrypt.hashSync('password', +config.HashSaltRound),
        role: UserRoles.superAdmin,
      },
    });

    const adminIds = await getIds(prisma.user, {
      OR: [{ role: UserRoles.superAdmin }, { role: UserRoles.admin }],
    });

    const windTypes = Object.values(WindType);
    const weatherTypes = Object.values(WeatherType);
    const cityIds = await getIds(prisma.city);

    await seedMenu(cityIds, adminIds, windTypes, weatherTypes);
    await seedSun(cityIds, adminIds);
    await seedFlower();
    await seedMap();

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedMenu(cityIds, adminIds, windTypes, weatherTypes) {
  await prisma.menu.createMany({
    data: cityIds.flatMap((cityId) => {
      return generateArray(dayToFeel * 24).map((_, hour) => {
        const timestamp = Date.now() + hour * 60 * 60 * 1000;
        return {
          date: new Date(timestamp),
          cityId: cityId,
          temperature: faker.number.int({ min: -100, max: 60 }),
          humidity: faker.number.float({ min: 0, max: 100 }),
          uv: faker.number.int({ min: 0, max: 12 }),
          windSpeed: faker.number.int({ min: 0, max: 100 }),
          windType: faker.helpers.arrayElement(windTypes),
          pressure: faker.number.int({ min: 400, max: 900 }),
          weatherType: faker.helpers.arrayElement(weatherTypes),
          createrUserId: faker.helpers.arrayElement(adminIds),
        };
      });
    }),
    skipDuplicates: true,
  });
  console.log('Menu data seeded.');
}
async function seedFlower() {
  await prisma.family.createMany({
    data: {
      name: 'Дерево',
    },
    skipDuplicates: true,
  });
  const familyIds = await getIds(prisma.family);
  await prisma.flower.createMany({
    data: {
      familyId: faker.helpers.arrayElement(familyIds),
      name: 'Береза',
    },
    skipDuplicates: true,
  });
}
async function seedSun(cityIds, adminIds) {
  await prisma.sun.createMany({
    data: cityIds.flatMap((cityId) => {
      return generateArray(dayToFeel).map((_, day) => ({
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
        cityId: cityId,
        sunset: new Date(2000, 1, 1, faker.number.int({ min: 18, max: 23 })),
        sunrise: new Date(2000, 1, 1, faker.number.int({ min: 0, max: 12 })),
        createrUserId: faker.helpers.arrayElement(adminIds),
      }));
    }),
    skipDuplicates: true,
  });
  console.log('Sun data seeded.');
}

async function seedMap() {
  const flowerIds = await getIds(prisma.flower);
  await prisma.map.createMany({
    data: generateArray(dayToFeel).flatMap((_, day) => {
      return generateArray(mapToFeel).map(() => {
        const randomOffset =
          faker.number.int({ min: -5, max: 5 }) * 60 * 60 * 1000;
        const timestamp = Date.now() + day * 24 * 60 * 60 * 1000 + randomOffset;
        return {
          date: new Date(timestamp),
          flowerId: faker.helpers.arrayElement(flowerIds),
          x: faker.number.float({ min: -90, max: 90 }),
          y: faker.number.float({ min: -180, max: 180 }),
          lvl: faker.number.int({ min: 0, max: 4000 }),
        };
      });
    }),
    skipDuplicates: true,
  });
  console.log('Map data seeded.');
}

seedDatabase();

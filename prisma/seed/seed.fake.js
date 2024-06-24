/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');
const {
  PrismaClient,
  UserRoles,
  WindType,
  WeatherType,
} = require('@prisma/client');

const prisma = new PrismaClient();

const daytoFeel = 5;
const mapToFeel = 20;

async function clearDatabase() {
  await prisma.menu.deleteMany();
  await prisma.sun.deleteMany();
  await prisma.map.deleteMany();
  
}

function getIds(entity, where = {}) {
  return entity
    .findMany({ select: { id: true }, where: where })
    .then((res) => res.map((el) => el.id));
}

function genArray(count) {
  return Array.from(Array(count));
}
async function seedDatabase() {
  await clearDatabase();
  const adminsId = await getIds(prisma.user, {
    OR: [{ role: UserRoles.superAdmin }, { role: UserRoles.admin }],
  });
  const windTypes = Object.values(WindType);
  const weatherType = Object.values(WeatherType);
  const cityId = await getIds(prisma.city);
  prisma.city.create({
    data: {},
  });
  await prisma.menu.createMany({
    data: cityId.flatMap((id) => {
      return genArray(daytoFeel * 24).map((_, hour) => {
        const timestamp = Date.now() + hour * 60 * 60 * 1000;
        return {
          date: new Date(timestamp),
          cityId: id,
          temperature: faker.number.int({ min: -100, max: 60 }),
          humidity: faker.number.float({ min: 0, max: 100 }),
          uv: faker.number.int({ min: 0, max: 12 }),
          windSpeed: faker.number.int({ min: 0, max: 100 }),
          windType: faker.helpers.arrayElement(windTypes),
          pressure: faker.number.int({ min: 400, max: 900 }),
          weatherType: faker.helpers.arrayElement(weatherType),
          createrUserId: faker.helpers.arrayElement(adminsId),
        };
      });
    }),
    skipDuplicates: true,
  });
  console.log('menu');
  await prisma.sun.createMany({
    data: cityId.flatMap((id) => {
      return genArray(daytoFeel).map((_, day) => ({
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
        cityId: id,
        sunset: new Date(2000, 1, 1, faker.number.int({ min: 18, max: 23 })),
        sunrise: new Date(2000, 1, 1, faker.number.int({ min: 0, max: 12 })),
        createrUserId: faker.helpers.arrayElement(adminsId),
      }));
    }),
    skipDuplicates: true,
  });
  console.log('sun');
  const flowerId = await getIds(prisma.flower);
  await prisma.map.createMany({
    data: genArray(daytoFeel).flatMap((_, day) => {
      return genArray(mapToFeel).map(() => {
        const randomOffset =
          faker.number.int({ min: -5, max: 5 }) * 60 * 60 * 1000;
        const timestamp = Date.now() + day * 24 * 60 * 60 * 1000 + randomOffset;
        return {
          date: new Date(timestamp),
          flowerId: faker.helpers.arrayElement(flowerId),
          x: faker.number.float({ min: -90, max: 90 }),
          y: faker.number.float({ min: -180, max: 180 }),
          lvl: faker.number.int({ min: 0, max: 4000 }),
        };
      });
    }),
    skipDuplicates: true,
  });
  console.log('map');
}
seedDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


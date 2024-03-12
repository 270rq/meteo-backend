import { Module } from '@nestjs/common';
import { SunModule } from './sun/sun.module';
import { RegionModule } from './region/region.module';
import { UserModule } from './user/user.module';
import { MapModule } from './map/map.module';
import { FlowerModule } from './flower/flower.module';
import { FamilyModule } from './family/family.module';
import { MenuModule } from './menu/menu.module';
import { CityModule } from './city/city.module';
import { PrismaModule } from './service/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CityModule,
    MenuModule,
    FamilyModule,
    FlowerModule,
    MapModule,
    UserModule,
    RegionModule,
    SunModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}

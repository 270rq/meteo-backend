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
import { MailModule } from './user/mail/mail.module';
import { FeedBackController } from './feed-back/feed-back.controller';
import { FeedBackService } from './feed-back/feed-back.service';

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
    MailModule,
  ],
  controllers: [FeedBackController],
  providers: [FeedBackService],
})
export class AppModule {}

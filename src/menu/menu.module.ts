import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { SunService } from 'src/sun/sun.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, SunService],
})
export class MenuModule {}

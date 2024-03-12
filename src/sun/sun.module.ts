import { Module } from '@nestjs/common';
import { SunService } from './sun.service';
import { SunController } from './sun.controller';

@Module({
  providers: [SunService],
  controllers: [SunController],
})
export class SunModule {}

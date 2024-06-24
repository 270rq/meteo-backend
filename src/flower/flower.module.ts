import { Module } from '@nestjs/common';
import { FlowerController } from './flower.controller';
import { FlowerService } from './flower.service';

@Module({
  controllers: [FlowerController],
  providers: [FlowerService],
})
export class FlowerModule {}

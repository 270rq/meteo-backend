import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './mail.service';
import { MailScheduler } from './mail.sheduler';
import { UserService } from '../user.service';
import { MapService } from 'src/map/map.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [MailService, MailScheduler, UserService, MapService],
  exports: [MailService],
})
export class MailModule {}

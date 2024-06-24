import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from './mail.service';
import { UserService } from '../user.service';

@Injectable()
export class MailScheduler {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async sendDailyEmail() {
    try {
      const usersWithNotifications =
        await this.userService.findUsersWithNotifications();

      for (const user of usersWithNotifications) {
        const { email } = user;
        const subject = 'Daily Update';
        const message = 'This is your daily update.';
        await this.mailService.sendMail(email, subject, message);
      }
    } catch (error) {
      console.error('Error sending daily emails:', error);
    }
  }
}

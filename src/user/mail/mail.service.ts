import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UserService } from '../user.service';
import { MapService } from 'src/map/map.service';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    private userService: UserService,
    private mapService: MapService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'mail.ru',
      auth: {
        user: 'chuprova-katya@list.ru',
        pass: '59v8g0LG4aEJRkFXsGrX',
      },
    });
  }

  async sendMail(to: string, subject: string) {
    try {
      const user = await this.userService.findOneByEmail(to);
      if (!user) {
        throw new Error('User not found');
      }

      const currentDate = new Date();
      const currentDateData = await this.mapService.geyByFlowerAndTime(
        user.flowerId,
        currentDate,
      );
      let particleCountCurrent = 0;
      if (currentDateData.length > 0) {
        particleCountCurrent = currentDateData.reduce(
          (acc, curr) => acc + curr.lvl,
          0,
        );
      }

      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateData = await this.mapService.geyByFlowerAndTime(
        user.flowerId,
        prevDate,
      );
      let particleCountPrev = 0;
      if (prevDateData.length > 0) {
        particleCountPrev = prevDateData.reduce(
          (acc, curr) => acc + curr.lvl,
          0,
        );
      }

      let trend = '';
      if (particleCountCurrent > particleCountPrev) {
        trend = 'повышение';
      } else if (particleCountCurrent < particleCountPrev) {
        trend = 'уменьшение';
      } else {
        trend = 'умеренное';
      }

      let message = `Здравствуйте, ${user.nickname}!\n\n`;
      message += `На ${currentDate.toLocaleString()} количество частиц аллергена в вашем районе: ${particleCountCurrent}\n`;
      message += `Тенденция: ${trend}\n`;

      await this.transporter.sendMail({
        from: 'chuprova-katya@list.ru',
        to,
        subject,
        text: message,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendNotificationToAdmin(userEmail: string, message: string) {
    try {
      const adminEmail = 'chuprova-katya@list.ru';
      await this.transporter.sendMail({
        from: adminEmail,
        to: adminEmail,
        subject: `Сообщение от пользователя ${userEmail}`,
        text: message,
      });
      console.log('Notification sent to admin successfully');
    } catch (error) {
      console.error('Error sending notification to admin:', error);
    }
  }
}

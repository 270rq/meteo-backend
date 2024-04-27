import { Injectable } from '@nestjs/common';
import { IFeedBack } from './interface/feed-back.interface';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { MailService } from 'src/user/mail/mail.service';

@Injectable()
export class FeedBackService {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async createFeedback(feedbackDto: IFeedBack) {
    try {
      const { email, message } = feedbackDto;

      const createdFeedback = await this.prisma.feedBack.create({
        data: {
          email: email,
          message: message,
        },
      });

      await this.mailService.sendNotificationToAdmin(email, message);

      return createdFeedback;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw new Error('Failed to create feedback');
    }
  }
}

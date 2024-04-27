import { Controller, Post, Body } from '@nestjs/common';
import { FeedBackService } from './feed-back.service';
import { FeedbackDto } from './dto/cretae-feed-back.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('feed-back')
@ApiTags('feed-back')
export class FeedBackController {
  constructor(private readonly feedbackService: FeedBackService) {}

  @Post()
  async createFeedback(@Body() feedbackDto: FeedbackDto) {
    try {
      const createdFeedback =
        await this.feedbackService.createFeedback(feedbackDto);
      return { success: true, data: createdFeedback };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { MailService } from './mail.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-allergen-info')
  @ApiOkResponse({ description: 'Allergen information sent successfully' })
  @ApiBadRequestResponse({ description: 'Invalid email provided' })
  @ApiInternalServerErrorResponse({
    description: 'Error sending allergen information',
  })
  async sendAllergenInfo(@Query('email') email: string) {
    if (!email || !email.trim()) {
      return { message: 'Invalid email provided' };
    }

    try {
      await this.mailService.sendAllergenInfoToUserByEmail(email);
      return { message: 'Allergen information sent successfully' };
    } catch (error) {
      return { message: 'Error sending allergen information', error };
    }
  }
}

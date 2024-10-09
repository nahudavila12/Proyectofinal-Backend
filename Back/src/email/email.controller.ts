import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './services/email/email.service';
import { SendEmailDto } from './dtos/send-email.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('api/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('health')
  @ApiResponse({ status: 200, description: 'Health check response.' })
  async healthCheck(@Res() res: Response) {
    try {
      const response = await this.emailService.healthCheck();
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('send-email')
  @ApiResponse({ status: 200, description: 'Email sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async sendEmail(@Body() body: SendEmailDto, @Res() res: Response) {
    try {
      const response = await this.emailService.sendEmail(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }
}

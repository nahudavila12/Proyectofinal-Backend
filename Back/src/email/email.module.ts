import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './services/email/email.service';
import { Email } from './providers/email/email';

@Module({
  controllers: [EmailController],
  providers: [EmailService, Email],
  exports: [EmailService]
})
export class EmailModule {}

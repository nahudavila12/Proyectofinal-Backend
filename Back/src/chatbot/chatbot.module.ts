import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], 
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService], 
})
export class ChatbotModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot') 
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async getMessage(@Body() body: { messages: Array<{ role: string; content: string }> }) {
    const { messages } = body;
    return this.chatbotService.getChatbotResponse(messages);
  }
}

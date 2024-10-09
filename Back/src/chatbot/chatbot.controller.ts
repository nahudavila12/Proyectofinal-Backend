import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  @ApiOperation({
    summary: 'Enviar mensajes al chatbot y obtener una respuesta',
  })
  async getMessage(
    @Body() body: { messages: Array<{ role: string; content: string }> },
  ) {
    const { messages } = body;
    return this.chatbotService.getChatbotResponse(messages);
  }
}

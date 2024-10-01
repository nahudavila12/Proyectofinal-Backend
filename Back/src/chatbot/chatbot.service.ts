import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface OpenAIChoice {
  message: {
    content: string;
  };
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
}

@Injectable()
export class ChatbotService {
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  private accommodationType: string | null = null; // Almacena el tipo de alojamiento seleccionado

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async getChatbotResponse(messages: Array<{ role: string; content: string }>): Promise<{ reply: string; suggestions: string[]; additionalInfo?: any }> {
    try {
      const response = await axios.post<OpenAIResponse>(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo-0125',
          messages: messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const botMessage = response.data.choices[0].message.content;

      let suggestions: string[] = [];
      let additionalInfo: any = null;

      // Manejo de reservas
      if (botMessage.toLowerCase().includes('reserva')) {
        suggestions = this.getReservationSuggestions();
        additionalInfo = this.handleReservationQueries(botMessage, suggestions);
      } 
      // Manejo de servicios
      else if (botMessage.toLowerCase().includes('servicios')) {
        suggestions = this.getAccommodationSuggestions();
        additionalInfo = {
          type: 'options',
          content: suggestions,
        };

        // Almacena el tipo de alojamiento seleccionado
        this.handleAccommodationType(botMessage);
      }

      // Respuesta final si hay un tipo de alojamiento seleccionado
      if (this.accommodationType) {
        const services = this.getAccommodationServices();
        additionalInfo = {
          type: 'list',
          content: services,
        };

        const message = `Has elegido un ${this.accommodationType}. ¿Te gustaría saber más sobre los servicios disponibles?`;
        return { reply: message, suggestions: [], additionalInfo };
      }

      return { reply: botMessage, suggestions, additionalInfo };
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      throw new Error('No se pudo obtener la respuesta del chatbot.');
    }
  }

  private getReservationSuggestions(): string[] {
    return [
      '¿Puedo cambiar la fecha de la reserva?',
      '¿Cuáles son los horarios de check-in y check-out?',
      '¿Qué sucede si necesito cancelar mi reserva?',
      '¿Hay descuentos disponibles para reservas anticipadas?',
    ];
  }

  private handleReservationQueries(botMessage: string, suggestions: string[]): any {
    const responses: { [key: string]: string } = {
      'cambiar la fecha': 'Puedes cambiar la fecha de tu reserva a través de nuestra aplicación o contactando a nuestro servicio al cliente.',
      'horarios de check-in y check-out': 'El horario de check-in es a las 3 PM y el de check-out es a las 11 AM.',
      'cancelar reserva': 'Si necesitas cancelar tu reserva, puedes hacerlo hasta 24 horas antes de la fecha de llegada sin cargo adicional.',
      'descuentos anticipados': 'Ofrecemos descuentos para reservas realizadas con al menos 30 días de anticipación. Consulta en la aplicación para más detalles.',
    };

    let chatbotResponse = '¿En qué puedo ayudarte con respecto a las reservas?';
    for (const suggestion of suggestions) {
      if (botMessage.toLowerCase().includes(suggestion.toLowerCase())) {
        const key = suggestion.toLowerCase().split(' ')[0];
        chatbotResponse = responses[key] || chatbotResponse;
        break;
      }
    }

    return {
      type: 'info',
      content: chatbotResponse,
    };
  }

  private getAccommodationSuggestions(): string[] {
    return [
      '¿Qué tipo de alojamiento prefieres?',
      '1. Hotel',
      '2. Cabaña',
      '3. Departamento',
    ];
  }

  private handleAccommodationType(botMessage: string): void {
    if (botMessage.toLowerCase().includes('hotel')) {
      this.accommodationType = 'hotel';
    } else if (botMessage.toLowerCase().includes('cabaña')) {
      this.accommodationType = 'cabin';
    } else if (botMessage.toLowerCase().includes('departamento')) {
      this.accommodationType = 'apartment';
    }
  }

  private getAccommodationServices(): string[] {
    const services = {
      hotel: [
        'Wi-Fi gratuito',
        'Gimnasio',
        'Piscina',
        'Desayuno incluido',
        'Servicio de limpieza diario',
        'Traslado al aeropuerto',
      ],
      cabin: [
        'Wi-Fi gratuito',
        'Aire acondicionado',
        'Estufa a leña',
        'Cocina equipada',
        'Zona de parrilla',
        'Patio privado',
        'Agua caliente',
      ],
      apartment: [
        'Wi-Fi gratuito',
        'Cocina',
        'Heladera',
        'Congelador',
        'Lavarropas',
        'Secador de pelo',
        'Televisor',
        'Balcón o patio privado',
      ],
    };

    return services[this.accommodationType as keyof typeof services] || [];
  }
}


import { 
  Controller, 
  Post, 
  Body, 
  Param, 
  ParseUUIDPipe, 
  Query, 
  Get } 
  from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('payments')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}


  
  @Post('create-order/:uuid')
  async createOrder(
    @Param('uuid', ParseUUIDPipe) paymentUuid: string,
    @Body('currency') currency: string) {
    return this.paypalService.createOrder(paymentUuid, currency);
  }

  
  @Get('return')
  async handleReturn(
    @Query('token') token: string,
    @Query('PayerID') payerId: string,
    @Query('paymentUuid') paymentUuid: string,
  ) {
    try {
    
      const result = await this.paypalService.captureOrder(token, payerId, paymentUuid);
      
      return { message: 'Pago completado con éxito', result };
      
    } catch (error) {
      return { message: 'Error al capturar el pago', error: error.message };
    }

  }
}

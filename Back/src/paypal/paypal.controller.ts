import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  Get,
} from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order/:uuid')
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  async createOrder(
    @Param('uuid', ParseUUIDPipe) paymentUuid: string,
    @Body('currency') currency: string,
  ) {
    return this.paypalService.createOrder(paymentUuid, currency);
  }

  @Get('return')
  @ApiResponse({ status: 200, description: 'Payment completed successfully.' })
  @ApiResponse({ status: 400, description: 'Error capturing the payment.' })
  async handleReturn(
    @Query('token') token: string,
    @Query('PayerID') payerId: string,
    @Query('paymentUuid') paymentUuid: string,
  ) {
    try {
      const result = await this.paypalService.captureOrder(
        token,
        payerId,
        paymentUuid,
      );
      return { message: 'Pago completado con éxito', result };
    } catch (error) {
      return { message: 'Error al capturar el pago', error: error.message };
    }
  }
}

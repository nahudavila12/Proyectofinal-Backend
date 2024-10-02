import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('payments')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order/:uuid')
  async createOrder(
    @Param('uuid', ParseUUIDPipe) userUuid: string,
    @Body() orderDetailUuid: string, 
    @Body('currency') currency: string) {
    return this.paypalService.createOrder(userUuid,orderDetailUuid, currency);
  }

  @Post('capture-payment/:uuid')
  async capturePayment(
    @Param('uuid', ParseUUIDPipe) userUuid: string,
    @Body() orderDetailUuid: string,
    @Body() orderId: string,
    @Body() reservationUuid: string,
    @Body() roomUuid: string
   ) {
    return this.paypalService.captureOrder(userUuid, orderId, orderDetailUuid, reservationUuid, roomUuid );
  }
}

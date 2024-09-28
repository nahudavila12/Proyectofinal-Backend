import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('payments')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async createOrder(@Body('amount') amount: string, @Body('currency') currency: string) {
    return this.paypalService.createOrder(amount, currency);
  }

  @Post('capture-payment/:orderId')
  async capturePayment(@Param('orderId') orderId: string) {
    return this.paypalService.captureOrder(orderId);
  }
}

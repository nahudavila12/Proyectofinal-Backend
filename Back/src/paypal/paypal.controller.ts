import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,

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
  @Param('uuid', ParseUUIDPipe) paymentUuid: string, // Esto es tu UUID de pago
  @Body() body: { currency: string; amount: number }, // Recibe el monto y la moneda
) {
  try {
    // Agrega paymentUuid al objeto que se pasa a createOrder
    const order = await this.paypalService.createOrder({
      currency: body.currency,
      amount: body.amount,
      paymentUuid, // Aquí se agrega paymentUuid
    });
    return order; // Retorna la orden creada
  } catch (error) {
    return { message: 'Error al crear la orden', error: error.message };
  }
}
  

  @Post('capture-order') // Cambiado a POST
  @ApiResponse({ status: 200, description: 'Payment completed successfully.' })
  @ApiResponse({ status: 400, description: 'Error capturing the payment.' })
  async captureOrder(
    @Body() body: { orderID: string; paymentUuid: string }, // Recibe el ID del pedido y el UUID
  ) {
    const { orderID} = body;
    try {
      const result = await this.paypalService.captureOrder(orderID); // Llama al servicio con solo el orderID
      return { message: 'Pago completado con éxito', result }; // Retorna el resultado de la captura
    } catch (error) {
      return { message: 'Error al capturar el pago', error: error.message };
    }
  }
}

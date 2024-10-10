import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;

  constructor() {
    const environment = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET,
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async createOrder(body: { currency: string; amount: number; paymentUuid: string }) {
    const { currency, amount, paymentUuid } = body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2), // Asegúrate de que el monto tenga dos decimales
          },
        },
      ],
    });
  
    try {
      const response = await this.client.execute(request);
      
      // Aquí puedes usar paymentUuid para guardar en la base de datos
      await this.savePaymentInfo({ paymentUuid, orderId: response.result.id });
  
      return response.result; // Retorna la respuesta de PayPal
    } catch (error) {
      // Manejo de errores más detallado
      console.error(`Error creating PayPal order: ${error.message}`);
      throw new Error(`Error creating PayPal order: ${error.response?.message || error.message}`);
    }
  }
  
  // Ejemplo de método para guardar la información del pago
  private async savePaymentInfo(paymentInfo: { paymentUuid: string; orderId: string }) {
    // Aquí iría la lógica para guardar paymentInfo en la base de datos
    console.log(`Saving payment info: ${JSON.stringify(paymentInfo)}`);
  }
  
  

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    try {
      const response = await this.client.execute(request);
      return response.result; // Retorna la respuesta de la captura
    } catch (error) {
      // Manejo de errores más detallado
      console.error(`Error capturing PayPal payment: ${error.message}`);
      throw new Error(`Error capturing PayPal payment: ${error.response?.message || error.message}`);
    }
  }
}

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

  async createOrder(totalAmount: string, currency: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: totalAmount,
          },
        },
      ],
    });

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error) {
      throw new Error(`Error creating PayPal order: ${error.message}`);
    }
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error) {
      throw new Error(`Error capturing PayPal payment: ${error.message}`);
    }
  }
}


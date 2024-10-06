import * as paypal from '@paypal/checkout-server-sdk'
import { config as dotenvConfig } from 'dotenv';

dotenvConfig()
 console.log(process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY_1);
 
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET_KEY_1,
  );
  const client = new paypal.core.PayPalHttpClient(environment);

  export default client;
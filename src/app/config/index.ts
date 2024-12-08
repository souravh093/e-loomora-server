import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  port: process.env.PORT,
  password: process.env.DEFAULT_PASS,
  jwtSecret: process.env.JWT_SECRET,
  serverUrl: process.env.SERVER_URL,
  clientUrl: process.env.CLIENT_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPass: process.env.ADMIN_PASS,
  store_id: process.env.STOREID,
  signature_key: process.env.SIGNATUREKEY,
  payment_url: process.env.PAYMENT_URL,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
};

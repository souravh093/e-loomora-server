import config from '../../config';
import { verifyPayment } from './payment.utils';
import prisma from '../../../db/db.config';
import { PaymentStatus } from '@prisma/client';

const confirmationService = async (
  transactionId: string,
  status: string,
  email: string,
) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
    await prisma.$transaction(async (prisma) => {
      const userData = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      const orderData = await prisma.order.findFirstOrThrow({
        where: {
          userId: userData.id,
          transactionId,
        },
        include: {
          orderItem: true,
        },
      });
    

      await prisma.order.update({
        where: {
          id: orderData.id,
          transactionId,
        },
        data: {
          status: PaymentStatus.COMPLETED,
        },
      });

      orderData?.orderItem.map(async (item) => {
        prisma.product.update({
          where: { id: item.productId },
          data: { inventoryCount: { decrement: item.quantity } },
        });
      });

      const paymentData = await prisma.payment.findFirstOrThrow({
        where: {
          transactionId: transactionId,
        },
      });

      await prisma.payment.update({
        where: {
          id: paymentData.id,
        },
        data: {
          status: PaymentStatus.COMPLETED,
        },
      });
    });
  }

  const successTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .success {
            color: #4CAF50;
          }
          .cancel {
            color: #f44336;
          }
          .redirect-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
          }
          .success-link {
            background-color: #4CAF50;
          }
          .cancel-link {
            background-color: #f44336;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="${status === 'success' ? 'success' : 'cancel'}">
            Payment ${status === 'success' ? 'Successful' : 'Canceled'}
          </h1>
          <a href="${config.clientUrl}" class="redirect-link ${status === 'success' ? 'success-link' : 'cancel-link'}">
            ${status === 'success' ? 'Go to Dashboard' : 'Retry Payment'}
          </a>
        </div>
      </body>
    </html>
  `;

  return successTemplate;
};

const getPayments = async () => {
  const result = await prisma.payment.findMany();

  return result;
};

export const PaymentServices = {
  confirmationService,
  getPayments,
};

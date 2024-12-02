import { Request, Response } from 'express';
import { PaymentServices } from './payment.service';

const confirmationController = async (req: Request, res: Response) => {
  const result = await PaymentServices.confirmationService(
    req.query.transactionId as string,
    req.query.status as string,
    req.query.email as string,
  );
  res.send(result);
};


export const PaymentController = {
  confirmationController,
};

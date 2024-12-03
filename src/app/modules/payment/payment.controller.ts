import { Request, Response } from 'express';
import { PaymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const confirmationController = async (req: Request, res: Response) => {
  const result = await PaymentServices.confirmationService(
    req.query.transactionId as string,
    req.query.status as string,
    req.query.email as string,
  );
  res.send(result);
};

const getPayments = catchAsync(async (req, res) => {
  const result = await PaymentServices.getPayments();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payments fetched successfully',
    data: result,
  });
});

export const PaymentController = {
  confirmationController,
  getPayments,
};

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const {result, meta} = await OrderService.getOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    meta,
    data: result,
  });
})

export const OrderController = {
  createOrder,
  getOrders,
};

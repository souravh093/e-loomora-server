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

const getOrderById = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const getOrderByUserId = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderByUserIdFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUserId,
};

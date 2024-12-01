import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopServices } from './shop.service';

const createShop = catchAsync(async (req, res) => {
  const result = await ShopServices.createShopIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Shop created successfully',
    data: result,
  });
});

const updateShop = catchAsync(async (req, res) => {
  const result = await ShopServices.updateShopIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop updated successfully',
    data: result,
  });
});

const deleteShop = catchAsync(async (req, res) => {
  await ShopServices.deleteShopFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop deleted successfully',
  });
});

const getShopById = catchAsync(async (req, res) => {
  const result = await ShopServices.getShopByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop fetched successfully',
    data: result,
  });
});

const getShops = catchAsync(async (req, res) => {
  const { result, meta } = await ShopServices.getShopsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shops fetched successfully',
    meta: meta,
    data: result,
  });
});

export const ShopController = {
  createShop,
  updateShop,
  deleteShop,
  getShopById,
  getShops,
};

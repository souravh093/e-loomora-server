import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getProducts(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getPrioritizeProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getPrioritizeProduct(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProductInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await ProductService.deleteProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
  });
});

const createProductImage = catchAsync(async (req, res) => {
  const result = await ProductService.createProductImageIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product image created successfully',
    data: result,
  });
});

const deleteProductImage = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProductImageFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

export const ProductController = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProductImage,
  deleteProductImage,
  getPrioritizeProducts,
};

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './users.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successfully',
    data: result,
  });
});

const createVendor = catchAsync(async (req, res) => {
  const result = await UserServices.createVendorIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup Vendor successfully',
    data: result,
  });
});

export const UsersController = {
  createUser,
  createVendor,
};

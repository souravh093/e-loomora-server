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

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await UserServices.getUserByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserByIdFromDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  const result = await UserServices.deleteUserByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

export const UsersController = {
  createUser,
  createVendor,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

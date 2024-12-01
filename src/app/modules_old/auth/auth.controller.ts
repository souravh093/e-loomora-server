import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken } = result;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
    },
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.resetPassword(
    req.body.id,
    req.body.newPassword,
    req.headers.authorization,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const result = await AuthServices.changePassword(
    email,
    oldPassword,
    newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

export const AuthController = {
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};

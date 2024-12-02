import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPasswordIntoDB(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const token = req.body.token;
  const result = await AuthServices.resetPasswordIntoDB(id, newPassword, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const changedPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const result = await AuthServices.changePasswordIntDB(
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
  loginUser,
  forgetPassword,
  resetPassword,
  changedPassword,
};

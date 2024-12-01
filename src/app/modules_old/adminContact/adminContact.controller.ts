import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminContactServices } from './adminContact.service';

const createAdminContact = catchAsync(async (req, res) => {
  const {data, message} = await AdminContactServices.createAdminContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: message,
    success: true,
    data,
  });
});

const getAdminContact = catchAsync(async (req, res) => {
  const result = await AdminContactServices.getAdminContactFromDB();

  sendResponse(res, {
    statusCode: 200,
    message: 'Admin contact fetched successfully',
    success: true,
    data: result,
  });
});

export const AdminContactController = {
  createAdminContact,
  getAdminContact,
};

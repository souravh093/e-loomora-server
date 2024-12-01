import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SuccessServices } from './success.service';

const upsertSuccess = catchAsync(async (req, res) => {
  const result = await SuccessServices.upsertSuccessIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success data upsert successfully',
    data: result,
  });
});

const getSuccess = catchAsync(async (req, res) => {
  const result = await SuccessServices.getSuccessFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success data fetched successfully',
    data: result,
  });
});

export const SuccessController = {
  upsertSuccess,
  getSuccess,
};

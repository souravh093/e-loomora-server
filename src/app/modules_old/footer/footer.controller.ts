import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FooterServices } from './footer.service';

const upsertFooter = catchAsync(async (req, res) => {
  const result = await FooterServices.upsertFooterIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer updated successfully',
    data: result,
  });
});

const getFooter = catchAsync(async (req, res) => {
  const result = await FooterServices.getFooterFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer fetched successfully',
    data: result,
  });
});

export const FooterController = {
  upsertFooter,
  getFooter,
};

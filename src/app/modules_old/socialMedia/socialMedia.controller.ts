import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SocialMediaServices } from './socialMedia.service';

const upsertSocialMedia = catchAsync(async (req, res) => {
  const result = await SocialMediaServices.upsertSocialMediaIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Social Media updated successfully',
    data: result,
  });
});

const getSocialMedia = catchAsync(async (req, res) => {
  const result = await SocialMediaServices.getSocialMediaFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Social Media fetched successfully',
    data: result,
  });
});

export const SocialMediaController = {
  upsertSocialMedia,
  getSocialMedia,
};

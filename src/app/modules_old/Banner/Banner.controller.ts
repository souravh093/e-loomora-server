import config from '../../config';
import { MulterFiles } from '../../types/globalTypes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BannerService } from './Banner.service';

const createBanner = catchAsync(async (req, res) => {
  const files = req.files as MulterFiles;
  const images = files['images']
    ? files['images'].map(
        (image) => `${config.serverUrl}/images/${image.filename}`,
      )
    : [];

  const result = await BannerService.createBannerIntoDB(req.body, images);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Banner created successfully',
    data: result,
  });
});

const getBanners = catchAsync(async (req, res) => {
  const result = await BannerService.getBannersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banners fetched successfully',
    data: result,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const result = await BannerService.updateBanner(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner updated successfully',
    data: result,
  });
});

const createBannerImage = catchAsync(async (req, res) => {
  const files = req.files as MulterFiles;

  const image = files['image']
    ? `${config.serverUrl}/images/${files['image'][0].filename}`
    : null;

  const result = await BannerService.createBannerImage(image);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Banner image created successfully',
    data: result,
  });
});

const deleteBannerImage = catchAsync(async (req, res) => {
  const result = await BannerService.deleteBannerImage(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner image deleted successfully',
    data: result,
  });
});

export const BannerController = {
  createBanner,
  getBanners,
  updateBanner,
  createBannerImage,
  deleteBannerImage,
};

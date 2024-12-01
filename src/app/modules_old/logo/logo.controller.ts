import config from '../../config';
import { TFile } from '../../interface/file';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LogoServices } from './logo.service';

const createLogo = catchAsync(async (req, res) => {
  const fileUrlWithPath = `${config.serverUrl}/images/${req?.file?.filename}`;
  const payload = {
    ...req.body,
    image: fileUrlWithPath,
  };
  const result = await LogoServices.createLogoIntoDB(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Logo created successfully',
    data: result,
  });
});

const getLogo = catchAsync(async (req, res) => {
  const result = await LogoServices.getLogoFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logo fetched successfully',
    data: result,
  });
});

const updateLogo = catchAsync(async (req, res) => {
  const requestFile: TFile | undefined = req.file || undefined;
  const result = await LogoServices.updateLogoIntoDB(req.body, requestFile);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logo update successfully',
    data: result,
  });
});

export const LogoController = {
  createLogo,
  updateLogo,
  getLogo,
};

import config from '../../config';
import { MulterFiles } from '../../types/globalTypes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MetaDataServices } from './metaData.service';

const upsertMetaData = catchAsync(async (req, res) => {
  const files = req.files as MulterFiles;
  const image = files['favicon']
    ? `${config.serverUrl}/images/${files['favicon'][0].filename}`
    : null;

  const result = await MetaDataServices.upsertMetaDataIntoDB({
    ...req.body,
    favicon: image,
  });

  sendResponse(res, {
    statusCode: 200,
    message: 'Meta Data updated successfully',
    success: true,
    data: result,
  });
});

const getMetaData = catchAsync(async (req, res) => {
  const result = await MetaDataServices.getMetaDataFromDB();

  sendResponse(res, {
    statusCode: 200,
    message: 'Meta Data fetched successfully',
    success: true,
    data: result,
  });
});

export const MetaDataController = {
  upsertMetaData,
  getMetaData,
};

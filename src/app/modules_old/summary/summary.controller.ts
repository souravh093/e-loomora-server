import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SummaryServices } from './summary.service';

const createSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.createSummaryIntoD(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Summary created successfully',
    data: result,
  });
});

const getSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.getSummaryById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Summary fetched successfully',
    data: result,
  });
});

const getSum = catchAsync(async (req, res) => {
  const result = await SummaryServices.getSummary();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Summary fetched successfully',
    data: result,
  });
});

const updateSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.updateSummerFromDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Summary updated successfully',
    data: result,
  });
});

const deleteSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.deleteSummaryById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Summary deleted successfully',
    data: result,
  });
});

export const SummaryController = {
  createSummary,
  getSummary,
  getSum,
  updateSummary,
  deleteSummary,
};

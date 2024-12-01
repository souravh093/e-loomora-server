import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactClientServices } from './contactClient.service';

const createContactClient = catchAsync(async (req, res) => {
  const result = await ContactClientServices.createContactClientIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    message: 'Contact client created successfully',
    success: true,
    data: result,
  });
});

const getContactClient = catchAsync(async (req, res) => {
  const result = await ContactClientServices.getContactClientFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    message: 'Contact client fetched successfully',
    success: true,
    data: result,
  });
});

const getSingleContactClient = catchAsync(async (req, res) => {
  const result = await ContactClientServices.getSingleContactClientFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Contact client fetched successfully',
    success: true,
    data: result,
  });
});

const deleteContactClient = catchAsync(async (req, res) => {
  const result = await ContactClientServices.deleteContactClientFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Contact client deleted successfully',
    success: true,
    data: result,
  });
});

export const ContactClientController = {
  createContactClient,
  getContactClient,
  getSingleContactClient,
  deleteContactClient,
};

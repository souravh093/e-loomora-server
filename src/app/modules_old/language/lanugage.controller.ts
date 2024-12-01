import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LanguageService } from "./lanugage.service";

const createLanguage = catchAsync(async (req, res) => {
    const result = await LanguageService.createLanguageIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Language created successfully',
        data: result,
    })
})

const getLanguages = catchAsync(async (req, res) => {
    const result = await LanguageService.getLanguagesFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Languages fetched successfully',
        data: result,
    })
})

const getLanguage = catchAsync(async (req, res) => {
    const result = await LanguageService.getLanguageFromDB(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Language fetched successfully',
        data: result,
    })
})

const updateLanguage = catchAsync(async (req, res) => {
    const result = await LanguageService.updateLanguageIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Language updated successfully',
        data: result,
    })
})

const deleteLanguage = catchAsync(async (req, res) => {
    const result = await LanguageService.deleteLanguageFromDB(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Language deleted successfully',
        data: result,
    })
})


export const LanguageController = {
    createLanguage,
    getLanguages,
    getLanguage,
    updateLanguage,
    deleteLanguage,
};
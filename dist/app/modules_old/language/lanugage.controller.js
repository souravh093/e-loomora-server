"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const lanugage_service_1 = require("./lanugage.service");
const createLanguage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lanugage_service_1.LanguageService.createLanguageIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Language created successfully',
        data: result,
    });
}));
const getLanguages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lanugage_service_1.LanguageService.getLanguagesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Languages fetched successfully',
        data: result,
    });
}));
const getLanguage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lanugage_service_1.LanguageService.getLanguageFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Language fetched successfully',
        data: result,
    });
}));
const updateLanguage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lanugage_service_1.LanguageService.updateLanguageIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Language updated successfully',
        data: result,
    });
}));
const deleteLanguage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lanugage_service_1.LanguageService.deleteLanguageFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Language deleted successfully',
        data: result,
    });
}));
exports.LanguageController = {
    createLanguage,
    getLanguages,
    getLanguage,
    updateLanguage,
    deleteLanguage,
};

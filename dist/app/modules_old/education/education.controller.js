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
exports.EducationController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const education_service_1 = require("./education.service");
const createEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_service_1.EducationServices.createEducationIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Education created successfully',
        data: result,
    });
}));
const getEducations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_service_1.EducationServices.getEducationsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Educations fetched successfully',
        data: result,
    });
}));
const getEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_service_1.EducationServices.getEducationFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Education fetched successfully',
        data: result,
    });
}));
const updateEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_service_1.EducationServices.updateEducationFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Education updated successfully',
        data: result,
    });
}));
const deleteEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield education_service_1.EducationServices.deleteEducationFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Education deleted successfully',
    });
}));
exports.EducationController = {
    createEducation,
    getEducations,
    getEducation,
    updateEducation,
    deleteEducation,
};

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
exports.BlogCategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blogCategory_service_1 = require("./blogCategory.service");
const createBlogCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_service_1.BlogCategoryServices.createBlogCategoryIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog Category created successfully',
        data: result,
    });
}));
const getBlogCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_service_1.BlogCategoryServices.getBlogCategoryFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog Category fetched successfully',
        data: result,
    });
}));
const updateBlogCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_service_1.BlogCategoryServices.updateBlogCategoryFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog Category updated successfully',
        data: result,
    });
}));
const deleteBlogCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_service_1.BlogCategoryServices.deleteBlogCategoryFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog Category deleted successfully',
        data: result,
    });
}));
exports.BlogCategoryController = {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};

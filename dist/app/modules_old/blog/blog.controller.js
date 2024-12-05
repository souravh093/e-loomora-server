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
exports.BlogController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const images = files['images']
        ? files['images'].map((image) => `${config_1.default.serverUrl}/images/${image.filename}`)
        : [];
    const result = yield blog_service_1.BlogServices.createBlogIntoDB(req.body, images);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.updateBlogIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_service_1.BlogServices.deleteBlogFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
    });
}));
const getBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getBlogFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog fetched successfully',
        data: result,
    });
}));
const getBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
}));
exports.BlogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getBlogs,
};

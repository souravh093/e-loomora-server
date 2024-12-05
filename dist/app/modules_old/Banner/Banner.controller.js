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
exports.BannerController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Banner_service_1 = require("./Banner.service");
const createBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const images = files['images']
        ? files['images'].map((image) => `${config_1.default.serverUrl}/images/${image.filename}`)
        : [];
    const result = yield Banner_service_1.BannerService.createBannerIntoDB(req.body, images);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Banner created successfully',
        data: result,
    });
}));
const getBanners = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Banner_service_1.BannerService.getBannersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Banners fetched successfully',
        data: result,
    });
}));
const updateBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Banner_service_1.BannerService.updateBanner(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Banner updated successfully',
        data: result,
    });
}));
const createBannerImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const image = files['image']
        ? `${config_1.default.serverUrl}/images/${files['image'][0].filename}`
        : null;
    const result = yield Banner_service_1.BannerService.createBannerImage(image);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Banner image created successfully',
        data: result,
    });
}));
const deleteBannerImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Banner_service_1.BannerService.deleteBannerImage(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Banner image deleted successfully',
        data: result,
    });
}));
exports.BannerController = {
    createBanner,
    getBanners,
    updateBanner,
    createBannerImage,
    deleteBannerImage,
};

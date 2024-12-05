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
exports.LogoController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const logo_service_1 = require("./logo.service");
const createLogo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const fileUrlWithPath = `${config_1.default.serverUrl}/images/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    const payload = Object.assign(Object.assign({}, req.body), { image: fileUrlWithPath });
    const result = yield logo_service_1.LogoServices.createLogoIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Logo created successfully',
        data: result,
    });
}));
const getLogo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield logo_service_1.LogoServices.getLogoFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Logo fetched successfully',
        data: result,
    });
}));
const updateLogo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestFile = req.file || undefined;
    const result = yield logo_service_1.LogoServices.updateLogoIntoDB(req.body, requestFile);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Logo update successfully',
        data: result,
    });
}));
exports.LogoController = {
    createLogo,
    updateLogo,
    getLogo,
};

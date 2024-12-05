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
exports.MetaDataController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const metaData_service_1 = require("./metaData.service");
const upsertMetaData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const image = files['favicon']
        ? `${config_1.default.serverUrl}/images/${files['favicon'][0].filename}`
        : null;
    const result = yield metaData_service_1.MetaDataServices.upsertMetaDataIntoDB(Object.assign(Object.assign({}, req.body), { favicon: image }));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Meta Data updated successfully',
        success: true,
        data: result,
    });
}));
const getMetaData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield metaData_service_1.MetaDataServices.getMetaDataFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Meta Data fetched successfully',
        success: true,
        data: result,
    });
}));
exports.MetaDataController = {
    upsertMetaData,
    getMetaData,
};

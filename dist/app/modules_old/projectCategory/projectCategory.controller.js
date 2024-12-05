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
exports.ProjectCategoryController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const projectCategory_service_1 = require("./projectCategory.service");
const createProjectCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const fileURLWithPath = `${config_1.default.serverUrl}/images/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    const result = yield projectCategory_service_1.ProjectCategoryServices.createProjectCategoryIntoDB(Object.assign(Object.assign({}, req.body), { image: fileURLWithPath }));
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Project Category created successfully',
        data: result,
    });
}));
const getProjectCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectCategory_service_1.ProjectCategoryServices.getProjectCategoriesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project Categories fetched successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.projectCategories,
    });
}));
const getSingleProjectCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectCategory_service_1.ProjectCategoryServices.singleProjectCategoryFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project Category fetched successfully',
        data: result,
    });
}));
exports.ProjectCategoryController = {
    createProjectCategory,
    getProjectCategories,
    getSingleProjectCategory,
};

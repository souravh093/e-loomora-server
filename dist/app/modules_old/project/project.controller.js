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
exports.ProjectController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const project_service_1 = require("./project.service");
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const firstImage = files['firstImage']
        ? `${config_1.default.serverUrl}/images/${files['firstImage'][0].filename}`
        : null;
    const secondImage = files['secondImage']
        ? `${config_1.default.serverUrl}/images/${files['secondImage'][0].filename}`
        : null;
    const thirdImage = files['thirdImage']
        ? `${config_1.default.serverUrl}/images/${files['thirdImage'][0].filename}`
        : null;
    const images = files['images']
        ? files['images'].map((image) => `${config_1.default.serverUrl}/images/${image.filename}`)
        : [];
    const result = yield project_service_1.ProjectServices.createProjectIntoDB(Object.assign(Object.assign({}, req.body), { firstImage,
        secondImage,
        thirdImage }), images);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: result,
    });
}));
const updateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const updateData = Object.assign({}, req.body);
    if (files['firstImage']) {
        updateData.firstImage = `${config_1.default.serverUrl}/images/${files['firstImage'][0].filename}`;
    }
    if (files['secondImage']) {
        updateData.secondImage = `${config_1.default.serverUrl}/images/${files['secondImage'][0].filename}`;
    }
    if (files['thirdImage']) {
        updateData.thirdImage = `${config_1.default.serverUrl}/images/${files['thirdImage'][0].filename}`;
    }
    const result = yield project_service_1.ProjectServices.updateProjectIntoDB(req.params.id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully',
        data: result,
    });
}));
const getProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, meta } = yield project_service_1.ProjectServices.getProjectsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Projects fetched successfully',
        meta,
        data: result,
    });
}));
const getProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.ProjectServices.getProjectFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project fetched successfully',
        data: project,
    });
}));
const deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_service_1.ProjectServices.deleteProjectFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully',
    });
}));
exports.ProjectController = {
    createProject,
    updateProject,
    getProjects,
    deleteProject,
    getProject,
};

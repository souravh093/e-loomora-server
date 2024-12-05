"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const metaData_validation_1 = __importDefault(require("./metaData.validation"));
const metaData_controller_1 = require("./metaData.controller");
const multer_1 = require("../../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([
    { name: 'favicon', maxCount: 1 }
]), (0, validationRequest_1.default)(metaData_validation_1.default), metaData_controller_1.MetaDataController.upsertMetaData);
router.get('/', metaData_controller_1.MetaDataController.getMetaData);
exports.MetaDataRoutes = router;

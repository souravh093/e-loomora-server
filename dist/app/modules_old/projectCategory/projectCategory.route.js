"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCategoryRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const projectCategory_validation_1 = require("./projectCategory.validation");
const projectCategory_controller_1 = require("./projectCategory.controller");
const multer_1 = require("../../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.single('image'), (0, validationRequest_1.default)(projectCategory_validation_1.ProjectCategoryValidation.createProjectCategoryValidationSchema), projectCategory_controller_1.ProjectCategoryController.createProjectCategory);
router.get('/', projectCategory_controller_1.ProjectCategoryController.getProjectCategories);
router.get('/:id', projectCategory_controller_1.ProjectCategoryController.getSingleProjectCategory);
exports.ProjectCategoryRoutes = router;

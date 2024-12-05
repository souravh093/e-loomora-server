"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const project_validation_1 = require("./project.validation");
const multer_1 = require("../../middlewares/multer");
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'thirdImage', maxCount: 1 },
    { name: 'images', maxCount: 20 },
]), (0, validationRequest_1.default)(project_validation_1.ProjectValidation.createProjectValidationSchema), project_controller_1.ProjectController.createProject);
router.get('/', project_controller_1.ProjectController.getProjects);
router.get('/:id', project_controller_1.ProjectController.getProject);
router.put('/:id', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'thirdImage', maxCount: 1 },
]), (0, validationRequest_1.default)(project_validation_1.ProjectValidation.updateProjectValidationSchema), project_controller_1.ProjectController.updateProject);
router.delete('/:id', (0, auth_1.default)('admin'), project_controller_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;

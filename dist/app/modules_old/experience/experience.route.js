"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const experience_validation_1 = require("./experience.validation");
const experience_controller_1 = require("./experience.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(experience_validation_1.ExperienceValidations.createExperienceValidation), experience_controller_1.ExperienceController.createExperience);
router.get('/:id', experience_controller_1.ExperienceController.getExperience);
router.get('/', experience_controller_1.ExperienceController.getExperiences);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(experience_validation_1.ExperienceValidations.updateExperienceValidation), experience_controller_1.ExperienceController.updateExperience);
router.delete('/:id', (0, auth_1.default)('admin'), experience_controller_1.ExperienceController.deleteExperience);
exports.ExperienceRoutes = router;

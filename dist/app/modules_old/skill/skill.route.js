"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const skill_validation_1 = require("./skill.validation");
const skill_controller_1 = require("./skill.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(skill_validation_1.SkillValidations.createSkillValidationSchema), skill_controller_1.SkillController.createSkill);
router.get('/', skill_controller_1.SkillController.getSkills);
router.get('/:id', skill_controller_1.SkillController.getSkillById);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(skill_validation_1.SkillValidations.updateSkillValidationSchema), skill_controller_1.SkillController.updateSkill);
router.delete('/:id', (0, auth_1.default)('admin'), skill_controller_1.SkillController.deleteSkill);
exports.SkillRoutes = router;

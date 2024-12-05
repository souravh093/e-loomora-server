"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementRouters = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const achievement_validation_1 = __importDefault(require("./achievement.validation"));
const achievement_controller_1 = require("./achievement.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(achievement_validation_1.default), achievement_controller_1.AchievementController.createAchievement);
router.get('/', achievement_controller_1.AchievementController.getAchievement);
router.put('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(achievement_validation_1.default), achievement_controller_1.AchievementController.updateAchievement);
router.delete('/', (0, auth_1.default)('admin'), achievement_controller_1.AchievementController.deleteAchievement);
exports.AchievementRouters = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const socialMedia_validation_1 = __importDefault(require("./socialMedia.validation"));
const socialMedia_controller_1 = require("./socialMedia.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(socialMedia_validation_1.default), socialMedia_controller_1.SocialMediaController.upsertSocialMedia);
router.get('/', socialMedia_controller_1.SocialMediaController.getSocialMedia);
exports.SocialMediaRoutes = router;

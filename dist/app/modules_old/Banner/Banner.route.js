"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const Banner_validation_1 = require("./Banner.validation");
const Banner_controller_1 = require("./Banner.controller");
const multer_1 = require("../../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([{ name: 'images', maxCount: 10 }]), (0, validationRequest_1.default)(Banner_validation_1.BannerValidation.createBannerValidationSchema), Banner_controller_1.BannerController.createBanner);
router.get('/', Banner_controller_1.BannerController.getBanners);
router.put('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(Banner_validation_1.BannerValidation.updateBannerValidationSchema), Banner_controller_1.BannerController.updateBanner);
router.post('/image', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([{ name: 'image', maxCount: 1 }]), Banner_controller_1.BannerController.createBannerImage);
router.delete('/image/:id', (0, auth_1.default)('admin'), Banner_controller_1.BannerController.deleteBannerImage);
exports.BannerRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN, client_1.Role.VENDOR), (0, validationRequest_1.default)(review_validation_1.ReviewValidation.productReviewValidation), review_controller_1.ReviewController.createReview);
router.post('/reply', (0, auth_1.default)(client_1.Role.VENDOR, client_1.Role.ADMIN), (0, validationRequest_1.default)(review_validation_1.ReviewValidation.replayReviewValidation), review_controller_1.ReviewController.replayReview);
router.get('/:shopId', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), review_controller_1.ReviewController.getReviews);
router.put('/:id', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN, client_1.Role.VENDOR), (0, validationRequest_1.default)(review_validation_1.ReviewValidation.productReviewValidation), review_controller_1.ReviewController.updateReview);
router.delete('/:id', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN, client_1.Role.VENDOR), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;

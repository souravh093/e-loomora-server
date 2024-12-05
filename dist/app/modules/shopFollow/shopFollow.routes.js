"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopFollowRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const shopFollow_validation_1 = require("./shopFollow.validation");
const shopFollow_controller_1 = require("./shopFollow.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.USER), (0, validationRequest_1.default)(shopFollow_validation_1.ShopFollowValidations.createShopFollowIntoDB), shopFollow_controller_1.ShopFollowController.followShop);
router.delete('/', (0, auth_1.default)(client_1.Role.USER), (0, validationRequest_1.default)(shopFollow_validation_1.ShopFollowValidations.createShopFollowIntoDB), shopFollow_controller_1.ShopFollowController.unfollowShop);
router.get('/:userId', (0, auth_1.default)(client_1.Role.USER), shopFollow_controller_1.ShopFollowController.getShopFollowByUserId);
router.get('/:shopId', (0, auth_1.default)(client_1.Role.VENDOR), shopFollow_controller_1.ShopFollowController.getShopFollowByShopId);
exports.ShopFollowRoutes = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopFollowController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const shopFollow_service_1 = require("./shopFollow.service");
const followShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shopFollow_service_1.ShopFollowService.followShopIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Shop Followed successfully',
        data: result,
    });
}));
const unfollowShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shopFollow_service_1.ShopFollowService.unfollowShopFromDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: result,
    });
}));
const getShopFollowByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shopFollow_service_1.ShopFollowService.getShopFollowByUserId(req.params.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const getShopFollowByShopId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shopFollow_service_1.ShopFollowService.getShopFollowByShopId(req.params.shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
exports.ShopFollowController = {
    followShop,
    unfollowShop,
    getShopFollowByUserId,
    getShopFollowByShopId,
};

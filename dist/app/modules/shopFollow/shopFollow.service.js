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
exports.ShopFollowService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const followShopIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.userId,
        },
    });
    const result = yield db_config_1.default.shopFollow.create({
        data: payload,
    });
    yield db_config_1.default.shop.update({
        where: {
            id: payload.shopId,
        },
        data: {
            follower: {
                increment: 1,
            },
        },
    });
    return result;
});
const unfollowShopFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.shopFollow.findUniqueOrThrow({
        where: {
            id: payload.id,
            userId: payload.userId,
            shopId: payload.shopId,
        },
    });
    yield db_config_1.default.shopFollow.delete({
        where: {
            id: payload.id,
            userId: payload.userId,
            shopId: payload.shopId,
        },
    });
    yield db_config_1.default.shop.update({
        where: {
            id: payload.shopId,
        },
        data: {
            follower: {
                decrement: 1,
            },
        },
    });
    return 'Shop Unfollowed successfully';
});
const getShopFollowByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shopFollow.findMany({
        where: {
            userId,
        },
    });
    return result;
});
const getShopFollowByShopId = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shopFollow.findMany({
        where: {
            shopId,
        },
    });
    return result;
});
const checkShopFollow = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shopFollow.findFirst({
        where: {
            userId: query.userId,
            shopId: query.shopId,
        },
    });
    return result;
});
const getAllShopFollow = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shopFollow.findMany();
    return result;
});
exports.ShopFollowService = {
    followShopIntoDB,
    unfollowShopFromDB,
    getShopFollowByUserId,
    getShopFollowByShopId,
    checkShopFollow,
    getAllShopFollow,
};

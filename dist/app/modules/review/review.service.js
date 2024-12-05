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
exports.ReviewService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.review.create({
        data: payload,
    });
    return result;
});
const getReviews = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.review.findMany({
        where: {
            product: {
                shopId: shopId,
            },
        },
        include: {
            product: {
                include: {
                    category: true,
                },
            },
            user: true,
        },
    });
    return result;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.review.findUniqueOrThrow({
        where: { id },
    });
    const result = yield db_config_1.default.review.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.review.findUniqueOrThrow({
        where: { id },
    });
    const result = yield db_config_1.default.review.delete({
        where: { id },
    });
    return result;
});
exports.ReviewService = {
    createReview,
    updateReview,
    deleteReview,
    getReviews,
};

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
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield prisma.product.findUniqueOrThrow({
            where: {
                id: payload.productId,
            },
        });
        const isExistUserReview = yield prisma.review.findFirst({
            where: {
                productId: payload.productId,
                userId: payload.userId,
            },
        });
        const review = yield prisma.review.create({
            data: payload,
        });
        if (isExistUserReview) {
            throw new Error('You have already reviewed this product');
        }
        if (product.avgRating !== 0) {
            yield prisma.product.update({
                where: {
                    id: payload.productId,
                },
                data: {
                    avgRating: product.avgRating + payload.rating / 2,
                },
            });
        }
        else if (product.avgRating === 0) {
            yield prisma.product.update({
                where: {
                    id: payload.productId,
                },
                data: {
                    avgRating: payload.rating,
                },
            });
        }
        return review;
    }));
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
            replayReview: true,
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
const replayReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.review.findUniqueOrThrow({
            where: {
                id: payload.reviewId,
            },
        });
        const replay = yield prisma.replayReview.create({
            data: payload,
        });
        return replay;
    }));
    return result;
});
exports.ReviewService = {
    createReview,
    updateReview,
    deleteReview,
    getReviews,
    replayReview,
};

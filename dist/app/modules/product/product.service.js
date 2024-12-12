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
exports.ProductService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.product.create({
        data: Object.assign(Object.assign({}, payload), { productImage: {
                create: payload.productImage.map((image) => ({
                    url: image,
                })),
            } }),
        include: {
            productImage: true,
        },
    });
    return result;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            productImage: true,
            review: {
                include: {
                    replayReview: true,
                    user: true,
                }
            },
            category: true,
            shop: true,
        },
    });
    return result;
});
const getProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const productItems = yield db_config_1.default.product.count({
        where: productQuery.where,
    });
    const totalPages = Math.ceil(productItems / productQuery.take);
    const result = yield db_config_1.default.product.findMany(Object.assign(Object.assign({}, productQuery), { include: {
            productImage: true,
            review: true,
            category: true,
            shop: true,
        } }));
    return {
        meta: {
            total: productItems,
            limit: productQuery.take,
            page: totalPages,
        },
        result,
    };
});
const getPrioritizeProduct = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const followedShop = yield db_config_1.default.shopFollow.findMany({
        where: {
            userId: loggedUser.id,
        },
    });
    // how to get prioritize product from followedShop
    const result = yield db_config_1.default.product.findMany({
        where: {
            shopId: {
                in: followedShop.map((shop) => shop.shopId),
            },
        },
        skip: 0,
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            productImage: true,
            review: true,
            category: true,
            shop: true,
        },
    });
    return result;
});
const updateProductInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.product.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
    });
    yield db_config_1.default.product.delete({
        where: {
            id,
        },
    });
});
const deleteProductImageFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.productImage.findUniqueOrThrow({
        where: {
            id,
        },
    });
    yield db_config_1.default.productImage.delete({
        where: {
            id,
        },
    });
    return 'Image deleted successfully';
});
const createProductImageIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.productImage.create({
        data: payload,
    });
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getProductById,
    getProducts,
    updateProductInDB,
    deleteProductFromDB,
    deleteProductImageFromDB,
    createProductImageIntoDB,
    getPrioritizeProduct,
};

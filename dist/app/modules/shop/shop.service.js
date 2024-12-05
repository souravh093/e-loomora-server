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
exports.ShopServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createShopIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shop.create({
        data: payload,
    });
    return result;
});
const updateShopIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.shop.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.shop.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteShopFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.shop.findUniqueOrThrow({
        where: {
            id,
        },
    });
    yield db_config_1.default.shop.delete({
        where: {
            id,
        },
    });
});
const getShopByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shop.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            product: true,
            owner: true,
        }
    });
    return result;
});
const getShopByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.shop.findFirst({
        where: {
            ownerId: userId,
        },
        include: {
            owner: true,
            product: true,
        }
    });
    return result;
});
const getShopsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const shopQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const shopItems = yield db_config_1.default.shop.count({
        where: shopQuery.where,
    });
    const totalPages = Math.ceil(shopItems / shopQuery.take);
    const result = yield db_config_1.default.shop.findMany(Object.assign(Object.assign({}, shopQuery), { include: {
            owner: true,
        } }));
    return {
        meta: {
            total: shopItems,
            limit: shopQuery.take,
            page: totalPages,
        },
        result,
    };
});
exports.ShopServices = {
    createShopIntoDB,
    updateShopIntoDB,
    deleteShopFromDB,
    getShopByIdFromDB,
    getShopsFromDB,
    getShopByUserId,
};

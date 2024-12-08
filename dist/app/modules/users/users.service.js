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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, payload), { role: client_1.Role.USER });
    if (userData.password) {
        userData.password = yield bcryptjs_1.default.hash(userData.password, 10);
    }
    const result = yield db_config_1.default.user.create({
        data: userData,
    });
    return result;
});
const createVendorIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, payload), { role: client_1.Role.VENDOR });
    if (userData.password) {
        userData.password = yield bcryptjs_1.default.hash(userData.password, 10);
    }
    const result = yield db_config_1.default.user.create({
        data: userData,
    });
    return result;
});
const getUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name', 'email'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        limit: query.limit,
        page: query.page,
    });
    const totalUsers = yield db_config_1.default.user.count({
        where: userQuery.where,
    });
    const totalPages = Math.ceil(totalUsers / userQuery.take);
    const result = yield db_config_1.default.user.findMany(Object.assign({}, userQuery));
    return {
        meta: {
            total: totalUsers,
            limit: userQuery.take,
            page: totalPages,
        },
        result,
    };
});
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateUserByIdFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    yield db_config_1.default.user.delete({
        where: {
            id,
        },
    });
    return 'User deleted successfully';
});
exports.UserServices = {
    createUserIntoDB,
    createVendorIntoDB,
    getUsersFromDB,
    getUserByIdFromDB,
    updateUserByIdFromDB,
    deleteUserByIdFromDB,
};

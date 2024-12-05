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
exports.ContactClientServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createContactClientIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.contactClient.create({
        data: payload,
    });
    return result;
});
const getContactClientFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const contactClientQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name', 'email'],
        searchQuery: query.searchQuery,
        filter: query.filter,
        orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
        page: query.page,
        pageSize: query.pageSize,
    });
    const totalItems = yield db_config_1.default.contactClient.count({
        where: contactClientQuery.where,
    });
    const currentPage = Number(query.page) || 1;
    const totalPages = Math.ceil(totalItems / contactClientQuery.take);
    const result = yield db_config_1.default.contactClient.findMany(Object.assign({}, contactClientQuery));
    return {
        meta: {
            totalItems,
            totalPages,
            currentPage,
        },
        result,
    };
});
const getSingleContactClientFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.contactClient.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const deleteContactClientFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findContactClient = yield db_config_1.default.contactClient.findUnique({
        where: {
            id,
        },
    });
    if (!findContactClient) {
        throw new AppError_1.default(404, 'Contact client not found');
    }
    const result = yield db_config_1.default.contactClient.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ContactClientServices = {
    createContactClientIntoDB,
    getContactClientFromDB,
    getSingleContactClientFromDB,
    deleteContactClientFromDB,
};

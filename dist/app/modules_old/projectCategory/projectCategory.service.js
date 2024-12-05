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
exports.ProjectCategoryServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createProjectCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.projectCategory.create({
        data: payload,
    });
    return result;
});
const getProjectCategoriesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name'],
        searchQuery: query.searchQuery,
        filter: query.filter,
        orderBy: query.orderBy,
        page: query.page,
        pageSize: query.pageSize,
    });
    const totalItems = yield db_config_1.default.projectCategory.count({
        where: result.where,
    });
    const totalPages = Math.ceil(totalItems / result.take);
    const currentPage = Number(query.page || 1);
    const projectCategories = yield db_config_1.default.projectCategory.findMany(Object.assign(Object.assign({}, result), { include: {
            Project: {
                include: {
                    ProjectImages: true,
                },
            },
        } }));
    return {
        meta: {
            totalItems,
            totalPages,
            currentPage,
        },
        projectCategories,
    };
});
const singleProjectCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.projectCategory.findUnique({
        where: {
            id,
        },
        include: {
            Project: {
                include: {
                    ProjectImages: true,
                },
            },
        },
    });
    return result;
});
exports.ProjectCategoryServices = {
    createProjectCategoryIntoDB,
    getProjectCategoriesFromDB,
    singleProjectCategoryFromDB,
};

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
exports.ExperienceServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createExperienceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.experience.create({
        data: payload,
    });
    return result;
});
const getExperiencesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const experienceQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['projectName', 'companyName', 'location'],
        searchQuery: query.searchQuery,
        filter: query.filter,
        orderBy: query.orderBy,
        page: query.page,
        pageSize: query.perPage,
    });
    const totalItems = yield db_config_1.default.experience.count({
        where: experienceQuery.where,
    });
    const currentPage = Number(query.page) || 1;
    const totalPages = Math.ceil(totalItems / experienceQuery.take);
    const result = yield db_config_1.default.experience.findMany(Object.assign({}, experienceQuery));
    return {
        meta: {
            totalItems,
            totalPages,
            currentPage,
        },
        result,
    };
});
const getExperienceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.experience.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateExperienceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.experience.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteExperienceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.experience.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ExperienceServices = {
    createExperienceIntoDB,
    getExperienceFromDB,
    getExperiencesFromDB,
    updateExperienceFromDB,
    deleteExperienceFromDB,
};

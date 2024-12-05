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
exports.CategoryService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.category.create({
        data: payload,
    });
    return result;
});
const getCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.category.findMany();
    return result;
});
const getCategoryByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.category.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const updateCategoryIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.category.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.category.findUniqueOrThrow({
        where: {
            id,
        },
    });
    yield db_config_1.default.category.delete({
        where: {
            id,
        },
    });
    return 'Category deleted successfully';
});
exports.CategoryService = {
    createCategoryIntoDB,
    getCategoriesFromDB,
    getCategoryByIdFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
};

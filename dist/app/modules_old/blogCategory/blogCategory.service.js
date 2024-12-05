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
exports.BlogCategoryServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createBlogCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.blogCategory.create({
        data: payload,
    });
    return result;
});
const getBlogCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.blogCategory.findUnique({
        where: {
            id: id,
        },
        include: {
            Blog: {
                include: {
                    BlogImages: true,
                },
            },
        },
    });
    return result;
});
const updateBlogCategoryFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.blogCategory.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteBlogCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.blogCategory.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.BlogCategoryServices = {
    createBlogCategoryIntoDB,
    getBlogCategoryFromDB,
    updateBlogCategoryFromDB,
    deleteBlogCategoryFromDB,
};

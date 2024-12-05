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
exports.BlogServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const getFilePathToUnlink_1 = require("../../utils/getFilePathToUnlink");
const fs_1 = __importDefault(require("fs"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createBlogIntoDB = (payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield prisma.blog.create({
            data: Object.assign(Object.assign({}, payload), { BlogImages: {
                    create: images.map((image) => ({
                        image,
                    })),
                } }),
            include: {
                BlogImages: true,
            },
        });
        return blog;
    }));
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield db_config_1.default.blog.findUnique({
        where: {
            id,
        },
    });
    if (!isBlogExist) {
        throw new AppError_1.default(404, 'Blog not found');
    }
    const result = yield db_config_1.default.blog.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield db_config_1.default.blog.findUnique({
        where: {
            id,
        },
        include: {
            BlogImages: true,
        },
    });
    if (!isBlogExist) {
        throw new AppError_1.default(404, 'Blog not found');
    }
    yield db_config_1.default.blog.delete({
        where: {
            id,
        },
    });
    if (isBlogExist.BlogImages.length > 0) {
        isBlogExist.BlogImages.forEach((image) => {
            const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(image.image);
            if (fs_1.default.existsSync(imageToUnlink)) {
                fs_1.default.unlinkSync(imageToUnlink);
            }
        });
    }
});
const getBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_config_1.default.blog.findUnique({
        where: { id },
        include: {
            BlogImages: true,
        },
    });
    if (!blog) {
        throw new AppError_1.default(404, 'Blog not found');
    }
    return blog;
});
const getBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogsQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name'],
        searchQuery: query.searchQuery,
        filter: query.filter,
        orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
        page: query.page,
        pageSize: query.perPage,
    });
    const totalItems = yield db_config_1.default.blog.count({
        where: blogsQuery.where,
    });
    const currentPage = Number(query.page) || 1;
    const totalPages = Math.ceil(totalItems / blogsQuery.take);
    const result = yield db_config_1.default.blog.findMany(Object.assign(Object.assign({}, blogsQuery), { include: {
            BlogImages: true,
            category: true,
        } }));
    return {
        meta: {
            totalItems,
            totalPages,
            currentPage,
        },
        result,
    };
});
exports.BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getBlogFromDB,
    getBlogsFromDB,
};

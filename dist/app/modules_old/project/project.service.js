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
exports.ProjectServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const fs_1 = __importDefault(require("fs"));
const getFilePathToUnlink_1 = require("../../utils/getFilePathToUnlink");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createProjectIntoDB = (payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield prisma.project.create({
            data: {
                name: payload.name,
                clientName: payload.clientName,
                location: payload.location,
                locationUrl: payload.locationUrl,
                firstDescription: payload.firstDescription,
                secondDescription: payload.secondDescription,
                thirdDescription: payload.thirdDescription,
                firstImage: payload.firstImage,
                secondImage: payload.secondImage,
                thirdImage: payload.thirdImage,
                categoryId: payload.categoryId,
                ProjectImages: {
                    create: images.map((image) => ({
                        image: image,
                    })),
                },
            },
            include: {
                ProjectImages: true,
            },
        });
        return project;
    }));
    return result;
});
const updateProjectIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield db_config_1.default.project.findUnique({
        where: { id },
    });
    if (!existingProject) {
        throw new AppError_1.default(404, 'Project not found');
    }
    const result = yield db_config_1.default.project.update({
        where: {
            id: id,
        },
        data: payload,
    });
    if (existingProject && payload.firstImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.firstImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    if (existingProject && payload.secondImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.secondImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    if (existingProject && payload.thirdImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.thirdImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    return result;
});
const getProjectsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const projectQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name', 'clientName', 'location'],
        searchQuery: query.searchQuery,
        filter: query.filter,
        orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
        page: query.page,
        pageSize: query.pageSize,
    });
    const totalItems = yield db_config_1.default.project.count({
        where: projectQuery.where,
    });
    const totalPages = Math.ceil(totalItems / projectQuery.take);
    const currentPage = Number(query.page || 1);
    const result = yield db_config_1.default.project.findMany(Object.assign(Object.assign({}, projectQuery), { include: {
            ProjectImages: true,
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
const getProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_config_1.default.project.findUnique({
        where: { id },
        include: {
            ProjectImages: true,
        },
    });
    if (!project) {
        throw new AppError_1.default(404, 'Project not found');
    }
    return project;
});
const deleteProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield db_config_1.default.project.findUnique({
        where: { id },
        include: {
            ProjectImages: true,
        },
    });
    if (!existingProject) {
        throw new AppError_1.default(404, 'Project not found');
    }
    yield db_config_1.default.project.delete({
        where: { id },
    });
    if (existingProject.firstImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.firstImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    if (existingProject.secondImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.secondImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    if (existingProject.thirdImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(existingProject.thirdImage);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    if (existingProject.ProjectImages.length > 0) {
        existingProject.ProjectImages.forEach((image) => {
            const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(image.image);
            if (fs_1.default.existsSync(imageToUnlink)) {
                fs_1.default.unlinkSync(imageToUnlink);
            }
        });
    }
});
exports.ProjectServices = {
    createProjectIntoDB,
    updateProjectIntoDB,
    getProjectsFromDB,
    deleteProjectFromDB,
    getProjectFromDB,
};

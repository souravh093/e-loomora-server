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
exports.BannerService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const getFilePathToUnlink_1 = require("../../utils/getFilePathToUnlink");
const fs_1 = __importDefault(require("fs"));
const createBannerIntoDB = (payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.banner.create({
        data: Object.assign(Object.assign({}, payload), { BannerImages: {
                create: images.map((image) => ({
                    image,
                })),
            } }),
        include: {
            BannerImages: true,
        },
    });
    return result;
});
const getBannersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.banner.findFirst({
        include: {
            BannerImages: true,
        },
    });
    return result;
});
const updateBanner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findBanner = yield db_config_1.default.banner.findFirst();
    if (!findBanner) {
        throw new Error('Banner not found');
    }
    const result = yield db_config_1.default.banner.update({
        where: {
            id: findBanner.id,
        },
        data: payload,
    });
    return result;
});
const createBannerImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const findBanner = yield db_config_1.default.banner.findFirst();
    if (!findBanner) {
        throw new Error('Banner not found');
    }
    if (!image) {
        throw new Error('Image is required');
    }
    const result = yield db_config_1.default.bannerImages.create({
        data: {
            image,
            bannerId: findBanner.id,
        },
    });
    return result;
});
const deleteBannerImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findBannerImage = yield db_config_1.default.bannerImages.findUnique({
        where: { id },
    });
    if (!findBannerImage) {
        throw new Error('Banner image not found');
    }
    const result = yield db_config_1.default.bannerImages.delete({
        where: {
            id,
        },
    });
    if (findBannerImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(findBannerImage.image);
        if (fs_1.default.existsSync(imageToUnlink)) {
            fs_1.default.unlinkSync(imageToUnlink);
        }
    }
    return result;
});
exports.BannerService = {
    createBannerIntoDB,
    getBannersFromDB,
    updateBanner,
    createBannerImage,
    deleteBannerImage,
};

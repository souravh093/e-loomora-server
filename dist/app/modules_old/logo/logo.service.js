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
exports.LogoServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const getFilePathToUnlink_1 = require("../../utils/getFilePathToUnlink");
const fs_1 = __importDefault(require("fs"));
const createLogoIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.logo.create({
        data: payload,
    });
    return result;
});
const getLogoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.logo.findFirst();
    return result;
});
const updateLogoIntoDB = (payload, requestImage) => __awaiter(void 0, void 0, void 0, function* () {
    const findLogo = yield db_config_1.default.logo.findFirst();
    if (!findLogo) {
        throw new AppError_1.default(400, 'Logo does not exists');
    }
    const result = yield db_config_1.default.logo.update({
        where: {
            id: findLogo === null || findLogo === void 0 ? void 0 : findLogo.id,
        },
        data: {
            // If requestImage is not undefined, then update the image
            image: requestImage
                ? `${config_1.default.serverUrl}/images/${requestImage.filename}`
                : findLogo.image,
            logoAlt: payload.logoAlt,
        },
    });
    if (result && requestImage) {
        const imageToUnlink = (0, getFilePathToUnlink_1.getImagePathToUnlink)(findLogo.image);
        fs_1.default.unlinkSync(imageToUnlink);
    }
    return result;
});
exports.LogoServices = {
    createLogoIntoDB,
    getLogoFromDB,
    updateLogoIntoDB,
};

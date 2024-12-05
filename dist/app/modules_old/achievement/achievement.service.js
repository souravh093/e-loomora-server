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
exports.AchievementServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createAchievementIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const achievement = yield db_config_1.default.achievement.create({ data: payload });
    return achievement;
});
const getAchievementFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const achievements = yield db_config_1.default.achievement.findFirst();
    return achievements;
});
const updateAchievementIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAchievementExist = yield db_config_1.default.achievement.findFirst();
    if (!isAchievementExist) {
        throw new AppError_1.default(404, 'Achievement not found');
    }
    const achievement = yield db_config_1.default.achievement.update({
        where: {
            id: isAchievementExist.id,
        },
        data: payload,
    });
    return achievement;
});
const deleteAchievementFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAchievementExist = yield db_config_1.default.achievement.findFirst();
    if (!isAchievementExist) {
        throw new AppError_1.default(404, 'Achievement not found');
    }
    const achievement = yield db_config_1.default.achievement.delete({
        where: {
            id: isAchievementExist.id,
        },
    });
    return achievement;
});
exports.AchievementServices = {
    createAchievementIntoDB,
    getAchievementFromDB,
    updateAchievementIntoDB,
    deleteAchievementFromDB,
};

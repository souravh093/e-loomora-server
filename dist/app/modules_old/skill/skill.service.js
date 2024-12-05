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
exports.SkillService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createSkillIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.create({ data: payload });
    return result;
});
const getSkillsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.findMany({
        where: {
            category: query.category,
        },
    });
    return result;
});
const getSkillByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSkillIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSkillFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SkillService = {
    createSkillIntoDB,
    getSkillsFromDB,
    getSkillByIdFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB,
};

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
exports.SkillController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const skill_service_1 = require("./skill.service");
const createSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_service_1.SkillService.createSkillIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Skill created successfully',
        data: skill,
    });
}));
const getSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield skill_service_1.SkillService.getSkillsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Skills fetched successfully',
        data: skills,
    });
}));
const getSkillById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_service_1.SkillService.getSkillByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Skill fetched successfully',
        data: skill,
    });
}));
const updateSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_service_1.SkillService.updateSkillIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Skill updated successfully',
        data: skill,
    });
}));
const deleteSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield skill_service_1.SkillService.deleteSkillFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Skill deleted successfully',
    });
}));
exports.SkillController = {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
};

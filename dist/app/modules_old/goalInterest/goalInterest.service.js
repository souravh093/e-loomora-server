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
exports.GoalInterestService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createGoalInterestIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_config_1.default.goalInterest.create({ data: payload });
});
const getGoalInterestFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_config_1.default.goalInterest.findFirst();
});
const updateGoalInterestIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isGoalInterestExist = yield db_config_1.default.goalInterest.findFirst();
    if (!isGoalInterestExist) {
        throw new AppError_1.default(404, 'GoalInterest not found');
    }
    return yield db_config_1.default.goalInterest.update({
        where: { id: isGoalInterestExist === null || isGoalInterestExist === void 0 ? void 0 : isGoalInterestExist.id },
        data: payload,
    });
});
const deleteGoalInterestFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const isGoalInterestExist = yield db_config_1.default.goalInterest.findFirst();
    if (!isGoalInterestExist) {
        throw new AppError_1.default(404, 'GoalInterest not found');
    }
    return yield db_config_1.default.goalInterest.delete({
        where: { id: isGoalInterestExist.id },
    });
});
exports.GoalInterestService = {
    createGoalInterestIntoDB,
    getGoalInterestFromDB,
    updateGoalInterestIntoDB,
    deleteGoalInterestFromDB,
};

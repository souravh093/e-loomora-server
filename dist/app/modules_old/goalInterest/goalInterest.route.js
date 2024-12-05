"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalInterestRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const goalInterest_validation_1 = __importDefault(require("./goalInterest.validation"));
const goalInterest_controller_1 = __importDefault(require("./goalInterest.controller"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(goalInterest_validation_1.default), goalInterest_controller_1.default.createGoalInterest);
router.get('/', goalInterest_controller_1.default.getGoalInterest);
router.put('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(goalInterest_validation_1.default), goalInterest_controller_1.default.updateGoalInterest);
router.delete('/:id', (0, auth_1.default)('admin'), goalInterest_controller_1.default.deleteGoalInterest);
exports.GoalInterestRoutes = router;

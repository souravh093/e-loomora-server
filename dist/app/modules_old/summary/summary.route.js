"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const summary_validation_1 = require("./summary.validation");
const summary_controller_1 = require("./summary.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(summary_validation_1.SummerValidations.createSummaryValidation), summary_controller_1.SummaryController.createSummary);
router.get('/:id', summary_controller_1.SummaryController.getSummary);
router.get('/', summary_controller_1.SummaryController.getSum);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(summary_validation_1.SummerValidations.updateSummaryValidation), summary_controller_1.SummaryController.updateSummary);
router.delete('/:id', (0, auth_1.default)('admin'), summary_controller_1.SummaryController.deleteSummary);
exports.SummaryRoutes = router;

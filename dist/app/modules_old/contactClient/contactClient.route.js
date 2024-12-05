"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactClientRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const contactClient_validation_1 = require("./contactClient.validation");
const contactClient_controller_1 = require("./contactClient.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, validationRequest_1.default)(contactClient_validation_1.ContactValidation.contactValidationSchema), contactClient_controller_1.ContactClientController.createContactClient);
router.get('/', (0, auth_1.default)('admin'), contactClient_controller_1.ContactClientController.getContactClient);
router.get('/:id', (0, auth_1.default)('admin'), contactClient_controller_1.ContactClientController.getSingleContactClient);
router.delete('/:id', (0, auth_1.default)('admin'), contactClient_controller_1.ContactClientController.deleteContactClient);
exports.ContactClientRoutes = router;

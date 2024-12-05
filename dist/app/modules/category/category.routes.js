"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.default)(category_validation_1.CategoryValidations.createCategoryValidation), category_controller_1.CategoryController.createCategory);
router.get('/', category_controller_1.CategoryController.getCategories);
router.get('/:id', category_controller_1.CategoryController.getCategoryById);
router.put('/:id', (0, auth_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.default)(category_validation_1.CategoryValidations.updateCategoryValidation), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(client_1.Role.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoriesRoutes = router;

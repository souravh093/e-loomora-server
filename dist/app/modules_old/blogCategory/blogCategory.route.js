"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blogCategory_validation_1 = require("./blogCategory.validation");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const blogCategory_controller_1 = require("./blogCategory.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(blogCategory_validation_1.BlogCategoryValidations.createBlogCategoryValidation), blogCategory_controller_1.BlogCategoryController.createBlogCategory);
router.get('/:id', blogCategory_controller_1.BlogCategoryController.getBlogCategory);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(blogCategory_validation_1.BlogCategoryValidations.updateBlogCategoryValidation), blogCategory_controller_1.BlogCategoryController.updateBlogCategory);
router.delete('/:id', (0, auth_1.default)('admin'), blogCategory_controller_1.BlogCategoryController.deleteBlogCategory);
exports.BlogCategoryRoutes = router;

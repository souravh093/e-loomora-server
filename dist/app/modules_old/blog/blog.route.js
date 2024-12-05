"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const multer_1 = require("../../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.fields([{ name: 'images', maxCount: 20 }]), (0, validationRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidation), blog_controller_1.BlogController.createBlog);
router.get('/', blog_controller_1.BlogController.getBlogs);
router.get('/:id', blog_controller_1.BlogController.getBlog);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(blog_validation_1.BlogValidations.updateBlogValidation), blog_controller_1.BlogController.updateBlog);
router.delete('/:id', (0, auth_1.default)('admin'), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = exports.fileUpload = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("../utils/constant");
const fileStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
// Filter function to accept only specific mimetypes for files
const fileFilter = function (req, file, cb) {
    if (constant_1.ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        // Reject file (skip upload)
        cb(new Error('Unsupported file type'), false);
    }
};
// Filter function to accept only specific mimetypes for images
const imageFilter = function (req, file, cb) {
    if (constant_1.ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
        cb(null, true); // Accept image
    }
    else {
        // Reject image (skip upload)
        cb(new Error('Unsupported image type'), false);
    }
};
// multer instance for file uploads
exports.fileUpload = (0, multer_1.default)({
    storage: fileStorage,
    fileFilter: fileFilter,
});
// multer instance for image uploads
exports.imageUpload = (0, multer_1.default)({
    storage: imageStorage,
    fileFilter: imageFilter,
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const client_1 = require("@prisma/client");
const handlePrismaError_1 = require("../errors/handlePrismaError");
const globalErrorHandler = (error, req, res, next) => {
    //  setting default value
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const errors = (0, handleZodError_1.default)(error);
        statusCode = errors === null || errors === void 0 ? void 0 : errors.statusCode;
        message = errors === null || errors === void 0 ? void 0 : errors.message;
        errorSources = errors === null || errors === void 0 ? void 0 : errors.errorSources;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError ||
        error instanceof client_1.Prisma.PrismaClientValidationError) {
        const errors = (0, handlePrismaError_1.handlePrismaError)(error);
        statusCode = errors === null || errors === void 0 ? void 0 : errors.statusCode;
        message = errors === null || errors === void 0 ? void 0 : errors.message;
        errorSources = errors === null || errors === void 0 ? void 0 : errors.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;

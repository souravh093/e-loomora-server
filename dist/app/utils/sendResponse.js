"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    return res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: (data === null || data === void 0 ? void 0 : data.meta) || null,
        data: data.data,
    });
};
exports.default = sendResponse;

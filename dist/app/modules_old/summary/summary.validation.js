"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummerValidations = void 0;
const zod_1 = require("zod");
const createSummaryValidation = zod_1.z.object({
    body: zod_1.z.object({
        summary: zod_1.z.string({ required_error: 'Summary is required' }),
    }),
});
const updateSummaryValidation = zod_1.z.object({
    body: zod_1.z.object({
        summary: zod_1.z.string({ required_error: 'Summary is required' }),
    }),
});
exports.SummerValidations = {
    createSummaryValidation,
    updateSummaryValidation,
};

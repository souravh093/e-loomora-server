"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageValidations = void 0;
const zod_1 = require("zod");
const createLanguageValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        launguage: zod_1.z.string({ required_error: 'Language is required' }),
        nativeName: zod_1.z.string({ required_error: 'Native name is required' }),
        level: zod_1.z.string({ required_error: 'Level is required' }),
    }),
});
const updateLanguageValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        launguage: zod_1.z.string().optional(),
        nativeName: zod_1.z.string().optional(),
        level: zod_1.z.string().optional(),
    }),
});
exports.LanguageValidations = {
    createLanguageValidationSchema,
    updateLanguageValidationSchema,
};

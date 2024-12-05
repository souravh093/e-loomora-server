"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const metaDataValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required' })
            .optional(),
    }),
});
exports.default = metaDataValidation;

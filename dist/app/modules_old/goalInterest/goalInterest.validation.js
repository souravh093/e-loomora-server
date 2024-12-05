"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const goalInterestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        goal: zod_1.z.string({ required_error: 'Goal is required' }),
    }),
});
exports.default = goalInterestValidationSchema;

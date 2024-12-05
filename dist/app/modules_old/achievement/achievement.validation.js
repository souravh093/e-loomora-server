"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const achievementValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        achievement: zod_1.z.string({ required_error: 'Achievement is required' }),
    })
});
exports.default = achievementValidationSchema;

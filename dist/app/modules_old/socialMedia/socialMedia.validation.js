"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const socialMediaValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        facebookUrl: zod_1.z
            .string({ required_error: 'Facebook URL is required' })
            .optional(),
        twitterUrl: zod_1.z
            .string({ required_error: 'Twitter URL is required' })
            .optional(),
        instagramUrl: zod_1.z
            .string({ required_error: 'Instagram URL is required' })
            .optional(),
        linkedinUrl: zod_1.z
            .string({ required_error: 'LinkedIn URL is required' })
            .optional(),
        youtubeUrl: zod_1.z
            .string({ required_error: 'Youtube URL is required' })
            .optional(),
    }),
});
exports.default = socialMediaValidationSchema;

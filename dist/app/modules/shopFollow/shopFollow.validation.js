"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopFollowValidations = void 0;
const zod_1 = require("zod");
const createShopFollowIntoDB = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User Id is required' }),
        shopId: zod_1.z.string({ required_error: 'Shop Id is required' }),
    }),
});
exports.ShopFollowValidations = {
    createShopFollowIntoDB,
};

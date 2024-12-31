"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createSubscription = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadySubscribe = yield db_config_1.default.subscription.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (alreadySubscribe) {
        throw new Error('You have already subscribed to our newsletter');
    }
    return yield db_config_1.default.subscription.create({
        data: payload,
    });
});
const getSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_config_1.default.subscription.findMany();
});
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.subscription.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SubscriptionService = {
    createSubscription,
    getSubscriptions,
    deleteSubscription,
};

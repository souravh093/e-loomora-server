"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join((process.cwd(), '.env')),
});
exports.default = {
    port: process.env.PORT,
    password: process.env.DEFAULT_PASS,
    jwtSecret: process.env.JWT_SECRET,
    serverUrl: process.env.SERVER_URL,
    clientUrl: process.env.CLIENT_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
    store_id: process.env.STOREID,
    signature_key: process.env.SIGNATUREKEY,
    payment_url: process.env.PAYMENT_URL,
    payment_verify_url: process.env.PAYMENT_VERIFY_URL
};

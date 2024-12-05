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
exports.seedAdminUser = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../app/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
exports.default = prisma;
const adminUser = {
    id: 'b9173f97-4d26-4aab-b905-a48f83eea75e',
    name: 'Admin User',
    role: client_1.Role.ADMIN,
    email: config_1.default.adminEmail || '',
    password: config_1.default.adminPass || '',
};
const seedAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminUserExists = yield prisma.user.findFirst({
        where: {
            email: config_1.default.adminEmail,
        },
    });
    if (!isAdminUserExists) {
        adminUser.password = yield bcryptjs_1.default.hash(adminUser.password, 10);
        yield prisma.user.create({
            data: adminUser,
        });
    }
});
exports.seedAdminUser = seedAdminUser;

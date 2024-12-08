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
exports.AuthServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const auth_utils_1 = require("./auth.utils");
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isPasswordMatch = bcryptjs_1.default.compareSync(payload.password, userExists.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(404, 'Invalid email or password');
    }
    const jwtPayload = {
        id: userExists.id,
        email: userExists.email,
        role: userExists.role,
        status: userExists.status,
    };
    const accessToken = (0, auth_utils_1.createToke)(jwtPayload, config_1.default.jwtSecret, '365d');
    return {
        accessToken,
    };
});
const forgetPasswordIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield db_config_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!findUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    const token = jsonwebtoken_1.default.sign({ email, id: findUser.id }, config_1.default.jwtSecret, { expiresIn: '1h' });
    const resetLink = `${config_1.default.clientUrl}/reset-password/?id=${findUser.id}&token=${token}`;
    (0, sendEmail_1.sendEmail)(resetLink, email);
    return 'Reset link sent to your email';
});
const resetPasswordIntoDB = (id, newPassword, token) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (!token) {
        throw new AppError_1.default(400, 'Token is required');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
    if (decoded.id !== findUser.id) {
        throw new AppError_1.default(401, 'Invalid token');
    }
    const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 10);
    yield db_config_1.default.user.update({
        where: {
            id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return 'Password reset successfully';
});
const changePasswordIntDB = (email, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield db_config_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!findUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    const isPasswordMatch = bcryptjs_1.default.compareSync(oldPassword, findUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(404, 'Invalid password');
    }
    const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 10);
    yield db_config_1.default.user.update({
        where: {
            email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return 'Password changed successfully';
});
exports.AuthServices = {
    loginUserFromDB,
    forgetPasswordIntoDB,
    resetPasswordIntoDB,
    changePasswordIntDB,
};

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
const db_config_1 = __importDefault(require("../../db/db.config"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: 'You are not authorized to access this route',
            });
        }
        const token = bearerToken.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const { role, email } = decoded;
        yield db_config_1.default.user.findFirstOrThrow({
            where: {
                email,
            },
        });
        if (requiredRoles && !requiredRoles.includes(role)) {
            return res.status(403).json({
                statusCode: 403,
                success: false,
                message: 'You are not authorized to access this route',
            });
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;

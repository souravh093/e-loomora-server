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
exports.AdminContactServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createAdminContactIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdminContact = yield db_config_1.default.contactInfo.findFirst();
    let result;
    if (!findAdminContact) {
        result = yield db_config_1.default.contactInfo.create({
            data: payload,
        });
    }
    else {
        result = yield db_config_1.default.contactInfo.update({
            where: {
                id: findAdminContact.id,
            },
            data: payload,
        });
    }
    return {
        data: result,
        message: findAdminContact
            ? 'Admin contact updated successfully'
            : 'Admin contact created successfully',
    };
});
const getAdminContactFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.contactInfo.findFirst();
    return result;
});
exports.AdminContactServices = {
    createAdminContactIntoDB,
    getAdminContactFromDB,
};

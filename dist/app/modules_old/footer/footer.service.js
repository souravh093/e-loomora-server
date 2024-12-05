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
exports.FooterServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const upsertFooterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findFooter = yield db_config_1.default.footer.findFirst();
    let result;
    if (!findFooter) {
        result = yield db_config_1.default.footer.create({
            data: payload,
        });
    }
    else {
        result = yield db_config_1.default.footer.update({
            where: {
                id: findFooter.id,
            },
            data: payload,
        });
    }
    return result;
});
const getFooterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.footer.findFirst();
    return result;
});
exports.FooterServices = {
    upsertFooterIntoDB,
    getFooterFromDB,
};

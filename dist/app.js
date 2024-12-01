"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.json({
        message: 'SSKMC server is running...',
    });
});
app.listen(5000, () => {
    console.log('SSKMC App is listening on port:5000');
});

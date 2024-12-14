"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const notFoundRoutes_1 = __importDefault(require("./app/middlewares/notFoundRoutes"));
const routes_1 = __importDefault(require("./app/routes"));
const golobalErrorHandler_1 = require("./app/middlewares/golobalErrorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = require("./db/db.config");
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.json({
        message: 'Loomora server is  running 🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♀️‍➡️',
    });
});
// routes
app.use('/api/v1', routes_1.default);
app.use(notFoundRoutes_1.default);
app.use(golobalErrorHandler_1.globalErrorHandler);
app.listen(config_1.default.port, () => {
    (0, db_config_1.seedAdminUser)();
    console.log(`Loomora Server is listening on port:${config_1.default.port} 😎`);
});

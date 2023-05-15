"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/moduleAlias");
const express_1 = __importDefault(require("express"));
const doteEnv_1 = __importDefault(require("./config/doteEnv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const web_1 = __importDefault(require("./routes/web"));
const app = (0, express_1.default)();
doteEnv_1.default;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api/v1/', web_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
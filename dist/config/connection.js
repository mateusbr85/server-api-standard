"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const knex_1 = __importDefault(require("knex"));
const doteEnv_1 = __importDefault(require("../config/doteEnv"));
doteEnv_1.default;
exports.knex = (0, knex_1.default)({
    client: process.env.DB_DATACLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
});
//# sourceMappingURL=connection.js.map
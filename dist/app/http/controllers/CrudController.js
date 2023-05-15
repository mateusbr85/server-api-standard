"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = void 0;
const connection_1 = require("../../../config/connection");
const CrudFunctions_1 = require("@plugins/controllers/CrudFunctions");
const responseFunction_1 = require("@plugins/express/responseFunction");
const pluralize_1 = __importDefault(require("pluralize"));
class CrudController {
    static async get(req, res) {
        const { crud, id } = req.params;
        const whereColumn = pluralize_1.default.singular(crud);
        const query = await (0, connection_1.knex)(crud).where(`${whereColumn}_id`, id)
            .first().catch((e) => { console.error(e); });
        return await (0, responseFunction_1.response)(query, res);
    }
    static async list(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { crud } = req.params;
        const schema = await (0, CrudFunctions_1.getSchema)(crud);
        let currentPage = parseInt((_b = (_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0');
        const perPage = parseInt((_d = (_c = req.query.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '10');
        const orderBy = (_e = req.query.orderBy) !== null && _e !== void 0 ? _e : "desc";
        const query = (0, connection_1.knex)(crud);
        const queryTotal = (0, connection_1.knex)(crud);
        if (currentPage == 1) {
            currentPage = 0;
        }
        else {
            currentPage = currentPage - 1;
        }
        if (currentPage > 0) {
            query.offset(currentPage * perPage);
        }
        query.limit(perPage);
        let totalPages = (_g = (_f = (await queryTotal.count().first().catch((e) => { console.error(e); }))) === null || _f === void 0 ? void 0 : _f.count) !== null && _g !== void 0 ? _g : 1;
        const registros = await query.catch((e) => console.error(e));
        const totalItems = parseInt(totalPages);
        let getTotalPagesInt = Math.round((parseInt(totalPages) / 10));
        const splitFloat = (_h = (parseInt(totalPages) / 10)) === null || _h === void 0 ? void 0 : _h.toString().split(".");
        if (splitFloat.length > 1) {
            getTotalPagesInt = getTotalPagesInt + 1;
        }
        totalPages = getTotalPagesInt;
        return res.status(200).json({
            registros,
            pagination: { currentPage: (currentPage <= 0 ? 1 : currentPage + 1), perPage, totalPages, totalItems },
            schema
        });
    }
    static async insert(req, res) {
        const { crud } = req.params;
        const { data } = req.body;
        const query = (0, connection_1.knex)(crud);
        const errors = [];
        const succes = [];
        if (![null, undefined].includes(data)) {
            await query.insert({ ...data }).then((response) => {
                succes.push({ message: 'Inserido com sucesso!' });
            }).catch((e) => {
                errors.push({ message: e.message });
            });
            return res.status(200).json({
                succes,
                errors
            });
        }
        return res.status(404).end();
    }
    static async update(req, res) {
        const { crud, id } = req.params;
        const { data } = req.body;
        const query = (0, connection_1.knex)(crud);
        const errors = [];
        const succes = [];
        const whereColumn = pluralize_1.default.singular(crud) + '_id';
        console.log(whereColumn);
        if (![null, undefined].includes(data)) {
            await query.update({ ...data }).where(whereColumn, id).then((response) => {
                succes.push({ message: 'Alterado com sucesso!' });
            }).catch((e) => {
                errors.push({ message: e.message });
            });
            return res.status(200).json({
                succes,
                errors
            });
        }
        return res.status(404).end();
    }
    static async delete(req, res) {
        const { crud, id } = req.params;
        const schema = await (0, CrudFunctions_1.getSchema)(crud);
        const errors = [];
        const succes = [];
        const whereColumn = pluralize_1.default.singular(crud) + '_id';
        if (crud && id) {
            await (0, connection_1.knex)(crud).where(whereColumn, id).del().then((res) => {
                if (res !== 0) {
                    succes.push({ message: 'Deletado com sucesso!' });
                }
                else {
                    errors.push({ message: 'Nenhum item para ser deletado!' });
                }
            }).catch((e) => {
                errors.push({ message: e.message });
            });
            return res.status(200).json({
                succes,
                errors
            });
        }
        return res.send(404).end();
    }
}
exports.CrudController = CrudController;
//# sourceMappingURL=CrudController.js.map
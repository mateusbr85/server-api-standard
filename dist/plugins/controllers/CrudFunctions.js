"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const connection_1 = require("../../config/connection");
const getSchema = async (table) => {
    return await (0, connection_1.knex)('information_schema.columns').select('table_name', 'column_name', 'data_type').where('table_name', table);
};
exports.getSchema = getSchema;
//# sourceMappingURL=CrudFunctions.js.map
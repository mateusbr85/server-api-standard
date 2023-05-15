"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = async (value, res, message = "Realizado com Sucesso", messageErro = 'Sem resultados') => {
    if (![undefined, null].includes(value)) {
        return res.status(200).json({ response: value, message: message });
    }
    else {
        return res.status(203).json({ message: messageErro });
    }
};
exports.response = response;
//# sourceMappingURL=responseFunction.js.map
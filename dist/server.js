"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cluster_1 = __importDefault(require("node:cluster"));
const doteEnv_1 = __importDefault(require("./config/doteEnv"));
const app_1 = __importDefault(require("./app"));
doteEnv_1.default;
if (node_cluster_1.default.isPrimary) {
    console.log(`Server started primary process: ${process.pid}`);
    const CPUS = 3;
    for (let i = 0; i < CPUS; i++) {
        node_cluster_1.default.fork();
    }
    node_cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Server process dead: ${worker.process.pid} with code: ${code}`);
        console.log(`[New process started...... ]`);
        node_cluster_1.default.fork();
    });
}
else {
    app_1.default.listen(process.env.PORT, () => {
        console.log(`Server started in port: ${process.env.PORT} on process: ${process.pid}`);
    });
}
//# sourceMappingURL=server.js.map
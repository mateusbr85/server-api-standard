"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consoleColors_1 = require("@plugins/consoleColors");
const CrudController_1 = require("@controllers/CrudController");
const router = (0, express_1.Router)();
router.use(async (req, res, next) => {
    console.log(`${consoleColors_1.yellow}[Process-Request]: ${consoleColors_1.reset}${process.pid}`);
    console.log(`${consoleColors_1.blue}[API-Route]:`, `${consoleColors_1.reset}${req.originalUrl}`);
    next();
});
router.get("/:crud/:id/get", async (req, res) => {
    await CrudController_1.CrudController.get(req, res);
});
router.get("/:crud/list", async (req, res) => {
    await CrudController_1.CrudController.list(req, res);
});
router.post("/:crud/insert", async (req, res) => {
    await CrudController_1.CrudController.insert(req, res);
});
router.put("/:crud/:id/update", async (req, res) => {
    await CrudController_1.CrudController.update(req, res);
});
router.delete('/:crud/:id/delete', async (req, res) => {
    await CrudController_1.CrudController.delete(req, res);
});
exports.default = router;
//# sourceMappingURL=web.js.map
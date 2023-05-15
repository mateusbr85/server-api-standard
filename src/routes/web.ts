import { Request, Response, Router } from "express";
// import dayjs from "dayjs";
import { blue, reset, yellow } from "@plugins/consoleColors";

// Classes
import { CrudController } from "@controllers/CrudController";

const router = Router();

router.use(async (req: Request, res: Response, next: any) => {
    console.log(`${yellow}[Process-Request]: ${reset}${process.pid}`);
    console.log(`${blue}[API-Route]:`, `${reset}${req.originalUrl}`);
    next();
});

router.get("/:crud/:id/get", async (req: Request, res: Response) => {
    await CrudController.get(req, res);
});

router.get("/:crud/list", async (req: Request, res: Response) => {
    await CrudController.list(req, res);
});

router.post("/:crud/insert", async (req: Request, res: Response) => {
    await CrudController.insert(req, res);
});

router.put("/:crud/:id/update", async (req: Request, res: Response) => {
    await CrudController.update(req, res);
});

router.delete('/:crud/:id/delete', async (req: Request, res: Response) => {
    await CrudController.delete(req, res);
})

export default router;

import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new UserController();

router.get("/", authMiddleware, controller.getUsers);
router.post("/", authMiddleware, controller.addUser);
router.delete("/:id", controller.remove);

export default router;

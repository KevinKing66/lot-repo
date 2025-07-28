import { Router } from "express";
import { SensorController } from "../controllers/sensor.controller";

const router = Router();
const controller = new SensorController();

router.post("/data", controller.ingestData);
router.post("/position/:deviceId", controller.getLastesPosition);
router.get("/history/:deviceId", controller.getHistoryBydeviceId);
router.get("/alert/history", controller.getHistoryBydeviceId);

export default router;

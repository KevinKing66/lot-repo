import { NextFunction, Request, Response } from "express";
import { SensorService } from "../services/sensor.service";

export class SensorController {
  private service = new SensorService();

  ingestData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.service.processSensorData(req.body);
      res.status(200).json({ message: "Datos procesados", ...result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };


  getHistoryBydeviceId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deviceId = req.params.deviceId;
    const token = req.headers.authorization;
    if (!token){
      res.status(400).json({ message: "Missing Authorization header" });
      return;
    }
    if (!deviceId){
      res.status(400).json({ message: "Missing required path parameter: deviceId" });
      return;
    }
    console.log("pre service")
    try {
      const result = await this.service.findHistoryBydeviceId(deviceId);
      res.status(200).json({ message: "Datos procesados", result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  getLastesPosition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deviceId = req.params.deviceId;
    const token = req.headers.authorization;
    console.log("if")
    if (!token){
      res.status(400).json({ message: "Missing Authorization header" });
      return;
    }
    if (!deviceId){
      res.status(400).json({ message: "Missing required path parameter: id" });
      return;
    }
    console.log("pre service")
    try {
      const result = await this.service.getLatestPosition(deviceId, token);
      res.status(200).json({ message: "Datos procesados", ...result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
} 
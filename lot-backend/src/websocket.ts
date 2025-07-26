import { Server, IncomingMessage, ServerResponse } from "http";
import * as WebSocket from "ws";
import { AuthService } from "./services/auth.service";
import { SensorDataDto } from "./dto/sensor-data.dto";
import { SensorService } from "./services/sensor.service";


export function setupWebSocket(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async (ws, req) => {
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    if (!token || typeof token !== 'string') {
      ws.close(1008, JSON.stringify({ error: "Token is required" }));
      return;
    }

    const authService = new AuthService();
    const user = await authService.getUserFromToken(token);

    if (!user) {
      ws.close(1008, "Token inválido");
      return;
    }
    console.log(`User ${user.email} connected via WebSocket`);
    ws.send(JSON.stringify({ message: `Welcome ${user.email}` }));


    ws.on("message", async (data) => {
      console.log(`Received from ${user.email}:`, data.toString());
      try {
        const payload = JSON.parse(data.toString()) as SensorDataDto;
        const sensorService = new SensorService();
        const res = await sensorService.processSensorData(payload);

        ws.send(JSON.stringify({ status: "ok", message: "Sensor data saved" }));
        
        if (res.estimatedHoursLeft < 1) {
          ws.send(JSON.stringify({ alert: "Warning: Fuel level low — less than 1 hour of autonomy remaining."}));
        }
      } catch (err) {
        console.error("Error guardando sensor:", err);
        ws.send(JSON.stringify({ status: "error", message: "Invalid data" }));
      }
    });

    ws.on("close", () => {
      console.log(`WebSocket closed for user ${user.email}`);
    });
  });
}
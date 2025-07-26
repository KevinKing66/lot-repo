import { WebSocket } from "ws";
import { User } from "../entities/User";

export interface ExtendedWebSocket extends WebSocket {
  user: JwtPayload | User;
}

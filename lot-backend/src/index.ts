import express from "express";
import cors from "cors";
import routes from "./routes";

import { createServer } from "http";
import { AppDataSource } from "./config/data-source";
import { setupWebSocket } from "./websocket";
import { corsOptions } from "./config/cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors(corsOptions))
app.use("/api", routes);


const server = createServer(app); // <-- Crear servidor HTTP
setupWebSocket(server)

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`WebSocket running on ws://localhost:${PORT}`);
    });
  })
  .catch((error) =>
    console.error("Error during Data Source initialization:", error)
  );

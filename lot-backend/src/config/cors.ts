import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // permitir requests sin origin (por ejemplo, curl o apps móviles)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

import { DataSource } from "typeorm";
import { User } from "../entities/User";
import "dotenv/config";
import { SensorData } from "../entities/SensorData";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, SensorData],
    synchronize: true,
});

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "dotenv/config";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm/database";
import cors from "cors";
import "../../container";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";
import rateLimiter from "./middlewares/rateLimiter";

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar",express.static("./tmp/avatar"));
app.use("/cars-image",express.static("./tmp/cars"));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({ error : err.message });
    }
    return res.status(500).json({ error : "Internal Server - Error : " + err.message });
});

export { app };
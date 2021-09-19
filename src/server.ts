import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({ error : err.message });
    }
    return res.status(500).json({ error : "Internal Server - Error : " + err.message });
});

app.listen(3333, () => console.log("Servers is running on port 3333"));
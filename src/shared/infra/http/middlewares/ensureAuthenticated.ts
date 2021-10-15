import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

interface IPayload{
    sub:string;
}

export default async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        throw new AppError("Token missing",401);
    }

    const [, token] = bearerToken.split(" ");

    try{
        const {sub: user_id} = verify(token, auth.secret_token) as IPayload;

        req.user = {
            id: user_id
        }

        next();
    }catch(err){
        throw new AppError("Invalid Token",401);
    }
}
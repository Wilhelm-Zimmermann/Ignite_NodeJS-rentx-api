import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementatios/UsersRepository";

interface IPayload{
    sub:string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        throw new AppError("Token missing",401);
    }

    const [, token] = bearerToken.split(" ");

    try{
        const {sub: user_id} = verify(token, "4e91e5ba0db62659b0d8f08d1fb887de") as IPayload;
        const usersRepository = new UserRepository();
        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists",401);
        }

        req.user = {
            id: user_id
        }

        next();
    }catch(err){
        throw new AppError("Invalid Token",401);
    }
}
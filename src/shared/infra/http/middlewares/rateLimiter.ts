import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port : Number(process.env.REDIS_PORT),
    enable_offline_queue: false
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10,
    duration: 1
})

export default async function rateLimiter(req: Request, res: Response, next: NextFunction) {
    try{
        await limiter.consume(req.ip);
        next();
    }catch(err) {
        throw new AppError("Too many requests", 429);
    }
}
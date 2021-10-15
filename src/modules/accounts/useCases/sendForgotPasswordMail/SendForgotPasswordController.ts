import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";


class SendForgotPasswordController{
    async handle(req: Request, res: Response): Promise<Response>{ 
        const { email } = req.body;
        
        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordUseCase);
        
        await sendForgotPasswordMailUseCase.execute(email);
        return res.json()
    }
}

export { SendForgotPasswordController };
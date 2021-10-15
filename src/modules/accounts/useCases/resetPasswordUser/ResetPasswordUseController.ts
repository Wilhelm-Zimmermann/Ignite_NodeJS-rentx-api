import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";


class ResetPasswordUseController{
    async handle(req: Request, res: Response): Promise<Response>{
        const { token } = req.query;
        const { password } = req.body;
        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

        resetPasswordUserUseCase.execute({
            token: String(token),
            password
        })
        return res.status(200).json();
    }
}

export { ResetPasswordUseController };
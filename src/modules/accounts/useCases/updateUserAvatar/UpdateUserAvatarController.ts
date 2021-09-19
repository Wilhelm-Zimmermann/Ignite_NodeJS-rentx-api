import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController{
    async handle(req: Request, res: Response): Promise<Response>{
        const avatarUserUseCase = container.resolve(UpdateUserAvatarUseCase);

        const { id } = req.user;
        const avatarFile = req.file.filename;

        await avatarUserUseCase.execute({user_id: id, avatarFile});

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController };
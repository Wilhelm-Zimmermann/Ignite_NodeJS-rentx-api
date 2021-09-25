import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { car_id } = req.params;
        const images = req.files as IFiles[];
        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

        const fileNames = images.map(x => x.filename)

        await uploadCarImageUseCase.execute({
            car_id,
            imagesName: fileNames
        });

        return res.status(201).send();
    }
}

export { UploadCarImagesController };
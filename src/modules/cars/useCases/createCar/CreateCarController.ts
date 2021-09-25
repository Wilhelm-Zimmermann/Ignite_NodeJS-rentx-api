import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createCarUseCase = container.resolve(CreateCarUseCase);

        const {
            brand,
            category_id,
            description,
            name,
            license_plate,
            daily_rate,
            fine_amount, } = req.body;

        const car = await createCarUseCase.execute({
            brand,
            category_id,
            description,
            name,
            license_plate,
            daily_rate,
            fine_amount,
        });

        return res.status(201).json(car);


    }
}

export { CreateCarController };
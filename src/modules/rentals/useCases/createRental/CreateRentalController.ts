import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


class CreateRentalController{
    async handle(req: Request, res: Response):Promise<Response>{
        const createRentalUseCase = container.resolve(CreateRentalUseCase)

        const { expected_return_date, car_id } = req.body;
        const { id } = req.user;

        const rental = await createRentalUseCase.execute({
            car_id,
            user_id: id,
            expected_return_date
        });

        return res.status(201).json(rental);
    }
}

export { CreateRentalController };
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvaiableCarsUseCase } from "./ListAvaiableCarsUseCase";


class ListAvaiableCarsController{

    async handle(req: Request, res: Response): Promise<Response>{
        const listAvaiableCarsUseCase = container.resolve(ListAvaiableCarsUseCase);
        const { brand, name, category_id } = req.query;

        const cars = await listAvaiableCarsUseCase.execute({
            brand: brand as string,
            category_id: category_id as string,
            name: name as string,
        });

        return res.json(cars);
    }

}

export { ListAvaiableCarsController };
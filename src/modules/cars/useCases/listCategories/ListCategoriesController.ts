import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {
    constructor(private listCategoryUseCase: ListCategoriesUseCase) { }

    handle(req: Request, res: Response): Response {
        const categories = this.listCategoryUseCase.execute();

        return res.status(200).json(categories);
    }
}

export { ListCategoriesController };
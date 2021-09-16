import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


class ImportCategoryController{

    constructor(private importCategoryUseCase: ImportCategoryUseCase){}
    
    handle(req: Request,res: Response): Response{
        const { file } = req;
        this.importCategoryUseCase.execute(file);
        return res.status(200).send();
    }
}

export { ImportCategoryController };
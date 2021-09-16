import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase(CategoriesRepository.getInstance());
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
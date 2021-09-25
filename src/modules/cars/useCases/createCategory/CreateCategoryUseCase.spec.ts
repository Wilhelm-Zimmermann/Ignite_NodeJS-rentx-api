import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMem } from "../../repositories/in-memory/CategoriesRepositoryInMem";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMem: CategoriesRepositoryInMem;

describe("Create category", () => {

    beforeEach(() => {
        categoriesRepositoryInMem = new CategoriesRepositoryInMem();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMem);
    })

    it("should be able to create a new category", async () => {
        const category = {
            name : "Category Test",
            description: "Category testing"
        }
        await createCategoryUseCase.execute({
            ...category
        });
        const categoryCreated = await categoriesRepositoryInMem.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with the same name", async () => {
        expect(async () => {

            const category = {
                name : "Category Test",
                description: "Category testing"
            }
            await createCategoryUseCase.execute({
                ...category
            });

        }).rejects.toBeInstanceOf(AppError);

    });
});
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryExists = this.categoriesRepository.findByName(name);

        if (categoryExists) {
            throw new Error("This category already exists");
        }

        this.categoriesRepository.create({
            name,
            description
        })
    }
}

export { CreateCategoryUseCase };
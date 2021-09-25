import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository){}

    async execute({ name, description } : IRequest): Promise<void>{

        const specificationExists = await this.specificationRepository.findByName(name);

        if(specificationExists){
            throw new AppError("This specification already exists",400);
        }

        await this.specificationRepository.create({name, description});
    }
}

export { CreateSpecificationUseCase };
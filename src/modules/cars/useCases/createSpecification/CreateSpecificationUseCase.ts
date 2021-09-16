import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

class CreateSpecificationUseCase{
    // Private, to release the keyword "this"
    constructor(private specificationRepository: ISpecificationsRepository){}

    execute({ name, description } : IRequest): void{

        const specificationExists = this.specificationRepository.findByName(name);

        if(specificationExists){
            throw new Error("This specification already exists");
        }

        this.specificationRepository.create({name, description});
    }
}

export { CreateSpecificationUseCase };
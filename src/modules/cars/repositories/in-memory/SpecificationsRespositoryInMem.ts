import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMem implements ISpecificationsRepository{
    
    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(x => x.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const all = this.specifications.filter(spec => ids.includes(spec.id));
        return all;
    }


}

export { SpecificationsRepositoryInMem }
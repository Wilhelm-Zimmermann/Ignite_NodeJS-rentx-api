import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvaiableCarsUseCase {

    constructor(@inject("CarsRepository") private carsRepository: ICarsRepository) { }

    async execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.listAvaiable(brand, category_id, name);
        return cars;
    }
}

export { ListAvaiableCarsUseCase };
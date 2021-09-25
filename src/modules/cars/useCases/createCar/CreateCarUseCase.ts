import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string;
    description: string;
    license_plate: string;
    daily_rate: number;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository
    ) { }

    async execute({
        brand,
        category_id,
        description,
        name,
        license_plate,
        daily_rate,
        fine_amount,
    }: IRequest): Promise<Car> {
        const carExists = await this.carRepository.findByLicensePlate(
            license_plate
        );

        if(carExists){
            throw new AppError("Car already Exists",400);
        }

        const car = await this.carRepository.create({
            brand,
            category_id,
            description,
            name,
            license_plate,
            daily_rate,
            fine_amount,
        });

        return car;
    }
}

export { CreateCarUseCase };
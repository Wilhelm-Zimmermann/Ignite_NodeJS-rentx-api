import { carRouter } from "../../../../shared/infra/http/routes/cars.routes";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMem implements ICarsRepository {
  
   
    cars: Car[] = [];

    async create({
        brand,
        category_id,
        description,
        name,
        license_plate,
        daily_rate,
        specifications,
        id,
        fine_amount }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            description,
            name,
            license_plate,
            daily_rate,
            fine_amount,
            id,
            specifications
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(x => x.license_plate === license_plate);
    }

    async listAvaiable(
        brand?: string, 
        category_id?: string,
        name?: string): Promise<Car[]> {
        return this.cars
        .filter(x => {
            if(
                x.avaiable === true ||
                (brand && x.brand === brand) ||
                (name && x.name === name) ||
                (category_id && x.category_id === category_id)
            )return x;
            return null;
        });
    }

    async findById(id: string):Promise<Car>{
        return this.cars.find(x => x.id === id);
    }
}

export { CarsRepositoryInMem };
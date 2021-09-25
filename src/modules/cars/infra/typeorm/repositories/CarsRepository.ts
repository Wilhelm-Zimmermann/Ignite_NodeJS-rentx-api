import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        specifications,
        id,
        name,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            id,
            specifications
        });
        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async listAvaiable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("car")
        .where("avaiable = :avaiable", {avaiable:true});

        if(brand){
            carsQuery.andWhere("car.brand = :brand", {brand: brand});
        }

        if(category_id){
            carsQuery.andWhere("car.category_id = :category_id", {category_id: category_id});
        }

        if(name){
            carsQuery.andWhere("car.name = :name", {name: name});
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    
    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id);
    }

}

export { CarsRepository };
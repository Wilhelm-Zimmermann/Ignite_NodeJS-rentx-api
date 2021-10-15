import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";



class RentalsRepositoryInMem implements IRentalsRepository{

    private rentals: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(x => x.car_id === car_id && !x.end_date);
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(x => x.user_id === user_id && !x.end_date);
    }

    async create({
        car_id,
        expected_return_date,
        user_id
    }: ICreateRentalDTO): Promise<Rental>{
        const rental = new Rental();

        Object.assign(rental,{
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        });

        this.rentals.push(rental);

        return rental;
    }
    
    async findById(id: string): Promise<Rental> {
        return this.rentals.find(x => x.id === id);
    }
    async findByUserId(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(x => x.user_id === user_id);
    }
}

export { RentalsRepositoryInMem };
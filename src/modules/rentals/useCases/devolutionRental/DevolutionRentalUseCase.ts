import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";


interface IRequest{
    id: string;
    user_id: string;    
}

@injectable()
class DevolutionRentalUseCase{

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({ id, user_id }:IRequest):Promise<Rental>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_dayli = 1;

        if(!rental){
            throw new AppError("Rental doesn't exists");
        }

        const now = this.dateProvider.getDate();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.getDate()
        )

        if(daily <= 0){
            daily = minimum_dayli;
        }

        const delay = this.dateProvider.compareInDays(
            now,
            rental.expected_return_date 
        );

        let total: number = 0;
        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.getDate();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailabe(car.id, true); 

        return rental;
    }
}

export { DevolutionRentalUseCase };
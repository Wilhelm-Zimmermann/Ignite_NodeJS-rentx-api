import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        const carUnavaiable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavaiable) {
            throw new AppError("Car unavaiable", 400);
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental progress for this user", 400);
        }

        const dateNow = this.dateProvider.getDate();
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        console.log(compare)

        if (compare < minimumHour) throw new AppError("The return date must be at least 24 hours");

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }
}

export { CreateRentalUseCase };
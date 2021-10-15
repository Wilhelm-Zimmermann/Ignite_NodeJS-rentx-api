import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMem } from "../../repositories/in-mem-repositories/RentalsRepositoryInMem";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs";
import { DayJsProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsProvider";
import { CarsRepositoryInMem } from "../../../cars/repositories/in-memory/CarsReposioryInMem";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMem;
let carsRepositoryInMem: CarsRepositoryInMem;
let dateProvider: DayJsProvider;

describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        carsRepositoryInMem = new CarsRepositoryInMem();
        rentalsRepository = new RentalsRepositoryInMem();
        dateProvider = new DayJsProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
            carsRepositoryInMem
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMem.create({
            name: "Test",
            description: "thisl",
            daily_rate: 234,
            license_plate: "testing",
            fine_amount: 89,
            category_id: "092348",
            brand: "brand"
        });
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: tomorrow
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        const car = await rentalsRepository.create({
            car_id: "12-a-34",
            expected_return_date: tomorrow,
            user_id: "123"
        })
        await expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: "1234",
            expected_return_date: tomorrow
        })
        ).rejects.toEqual(new AppError("There is a rental progress for this user", 400));
    })

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepository.create({
            user_id: "1234",
            expected_return_date: tomorrow,
            car_id: "kasdljf"
        })
        await expect(createRentalUseCase.execute({
            user_id: "12223",
            car_id: "kasdljf",
            expected_return_date: tomorrow
        })
        ).rejects.toEqual(new AppError("Car unavaiable", 400));

    })

    it("should not be able to create a new rental when return date is lower than 24 hours", async () => {

        expect(createRentalUseCase.execute({
            user_id: "12322",
            car_id: "kasdljfasf",
            expected_return_date: new Date()
        })
        ).rejects.toEqual(new AppError("The return date must be at least 24 hours"));
    })
})
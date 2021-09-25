import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMem } from "../../repositories/in-mem-repositories/RentalsRepositoryInMem";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs";
import { DayJsProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMem;
let dateProvider: DayJsProvider;

describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMem();
        dateProvider = new DayJsProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: "kasdljf",
            expected_return_date: tomorrow
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "kasdljf",
                expected_return_date: tomorrow
            });
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "kasssdljf",
                expected_return_date: tomorrow
            });

        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create a new rental if there is another open to the same car", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "kasdljf",
                expected_return_date: tomorrow
            });
            await createRentalUseCase.execute({
                user_id: "12223",
                car_id: "kasdljf",
                expected_return_date: tomorrow
            });

        }).rejects.toBeInstanceOf(AppError);

    })

    it("should not be able to create a new rental when return date is lower than 24 hours", () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12322",
                car_id: "kasdljfasf",
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    })
})
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMem } from "../../repositories/in-memory/CarsReposioryInMem";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMem;

describe("Create car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMem()
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            brand: "Bradn",
            category_id: "cat,j",
            daily_rate: 100,
            description: "This is fast car",
            fine_amount: 123,
            license_plate: "adskjf1",
            name: "Name czr"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with the same license_plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                brand: "Car 1",
                category_id: "cat,j",
                daily_rate: 100,
                description: "This is fast car",
                fine_amount: 123,
                license_plate: "adskjf1",
                name: "Name czr"
            });

            await createCarUseCase.execute({
                brand: "Bradn",
                category_id: "cat,j",
                daily_rate: 100,
                description: "This is fast car",
                fine_amount: 123,
                license_plate: "adskjf1",
                name: "Car 1"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car 'avaiable' == true", async () => {
        const car = await createCarUseCase.execute({
            brand: "Bradn",
            category_id: "cat,j",
            daily_rate: 100,
            description: "This is fast car",
            fine_amount: 123,
            license_plate: "adskjf1",
            name: "Car Avaiable"
        })

        expect(car.avaiable).toBe(true);
    })
});
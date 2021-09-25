import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMem } from "../../repositories/in-memory/CarsReposioryInMem";
import { SpecificationsRepositoryInMem } from "../../repositories/in-memory/SpecificationsRespositoryInMem";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMem: SpecificationsRepositoryInMem;
let carsRepositoryInMem: CarsRepositoryInMem;

describe("Create car specification", () => {

    beforeEach(() => {
        carsRepositoryInMem = new CarsRepositoryInMem();
        specificationsRepositoryInMem = new SpecificationsRepositoryInMem();
        createCarSpecificationUseCase =
            new CreateCarSpecificationUseCase(
                carsRepositoryInMem,
                specificationsRepositoryInMem
            );
    });

    it("should be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMem.create({
            brand: "Bradn",
            category_id: "cat,j",
            daily_rate: 100,
            description: "This is fast car",
            fine_amount: 123,
            license_plate: "adskjf1",
            name: "Name czr"
        });

        const specification = await specificationsRepositoryInMem.create({
                description: "testin tess",
                name: "test"
            });

        const car_id = car.id;
        const specifications_id = [specification.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id
        });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    })

    it("should not be able to add a new specification to the a non existing car", async () => {
        const car_id = "1234";
        const specifications_id = ["2374"]

        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})
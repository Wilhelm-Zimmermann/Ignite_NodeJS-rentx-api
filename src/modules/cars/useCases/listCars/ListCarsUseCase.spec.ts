import { CarsRepositoryInMem } from "../../repositories/in-memory/CarsReposioryInMem";
import { ListAvaiableCarsUseCase } from "./ListAvaiableCarsUseCase";


let listAvaiableCarsUseCase: ListAvaiableCarsUseCase;
let carsRepository: CarsRepositoryInMem;


describe("List cars", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMem();
        listAvaiableCarsUseCase = new ListAvaiableCarsUseCase(carsRepository);
    });

    it("Should be able to list all avaiable cars", async () => {
        await carsRepository.create({
            brand: "AUDI",
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102",
            description: "This is the beaultiful car",
            name: "Audi RTS9",
            license_plate: "afas9s8",
            daily_rate: 129,
            fine_amount: 90
        })

        await carsRepository.create({
            brand: "AUDI",
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102",
            description: "This is the beaultiful and fast car",
            name: "Audi RT8",
            license_plate: "afassxxs8",
            daily_rate: 129,
            fine_amount: 90
        })
        const cars = await listAvaiableCarsUseCase.execute({});

        expect(cars).toHaveLength(2);
    });

    it("should be able to list avaiable cars by name", async () => {
        const car = await carsRepository.create({
            brand: "AUDI",
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102",
            description: "This is the beaultiful and fast car",
            name: "Audi RT8",
            license_plate: "afassxxs8",
            daily_rate: 129,
            fine_amount: 90
        })
        const cars = await listAvaiableCarsUseCase.execute({
            name: "Audi RT8"
        });

        expect(cars).toMatchObject([car]);
    })

    it("should be able to list avaiable cars by brand", async () => {
        const car = await carsRepository.create({
            brand: "AUDI",
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102",
            description: "This is the beaultiful and fast car",
            name: "Audi RT8",
            license_plate: "afassxxs8",
            daily_rate: 129,
            fine_amount: 90
        })
        const cars = await listAvaiableCarsUseCase.execute({
            brand: "AUDI"
        });

        expect(cars).toMatchObject([car]);
    })

    it("should be able to list avaiable cars by category_id", async () => {
        const car = await carsRepository.create({
            brand: "AUDI",
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102",
            description: "This is the beaultiful and fast car",
            name: "Audi RT8",
            license_plate: "afassxxs8",
            daily_rate: 129,
            fine_amount: 90
        })
        const cars = await listAvaiableCarsUseCase.execute({
            category_id: "c07191c3-5edd-47a1-94ad-28b7b71a2102"
        });

        expect(cars).toMatchObject([car]);
    });
})
import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ){}

    async execute({ car_id, imagesName }: IRequest): Promise<void> {
        imagesName.map(async image => {
            await this.carsImageRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
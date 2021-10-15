import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({ car_id, imagesName }: IRequest): Promise<void> {
        imagesName.map(async image => {
            await this.carsImageRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImagesUseCase };
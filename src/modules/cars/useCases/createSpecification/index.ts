import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecificationController } from "./SpecificationController";


const createSpecificationUseCase = new CreateSpecificationUseCase(SpecificationsRepository.getInstance());
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);
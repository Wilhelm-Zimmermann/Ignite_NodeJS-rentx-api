import { Router } from "express";
import ensureAuthenticated  from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/SpecificationController";

const createSpecificationController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/",createSpecificationController.handle);

export { specificationRoutes };
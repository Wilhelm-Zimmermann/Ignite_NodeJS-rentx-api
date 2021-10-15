import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import ensureAuthenticated  from "../middlewares/ensureAuthenticated";
const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutinoRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRouter.post(
    "/",
    ensureAuthenticated,
    createRentalController.handle
);

rentalRouter.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutinoRentalController.handle
);

rentalRouter.get    (
    "/list_rentals",
    ensureAuthenticated,    
    listRentalsByUserController.handle
);

export { rentalRouter };
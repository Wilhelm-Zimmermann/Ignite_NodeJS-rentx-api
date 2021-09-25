import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaiableCarsController } from "../../../../modules/cars/useCases/listCars/ListAvaiableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadImage/UploadCarImagesController";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carRouter = Router();
const createCarController = new CreateCarController();
const listAvaiableCarsController = new ListAvaiableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new  UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);


carRouter.get(
    "/available",
    listAvaiableCarsController.handle
);

carRouter.post(
    "/specifications/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carRouter.post(
    "/images/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
);
export { carRouter };
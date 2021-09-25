import { Router } from "express";
import multer from "multer";
import upload from "../../../../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const userRouter = Router();

const uploadAvatar = multer(upload.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const avatartUserController = new UpdateUserAvatarController();

userRouter.post("/",createUserController.handle);
userRouter.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    avatartUserController.handle);

export { userRouter };

import { Router } from "express";
import multer from "multer";
import upload from "../../../../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";

const userRouter = Router();

const uploadAvatar = multer(upload);

const createUserController = new CreateUserController();
const avatartUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRouter.post("/",createUserController.handle);

userRouter.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    avatartUserController.handle
);

userRouter.get(
    "/profile",
    ensureAuthenticated,
    profileUserController.handle
);

export { userRouter };

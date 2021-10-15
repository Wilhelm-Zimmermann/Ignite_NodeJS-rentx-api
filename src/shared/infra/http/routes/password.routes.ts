import { Router } from "express";
import { ResetPasswordUseController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUseController";
import { SendForgotPasswordController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController";

const passRouter = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordUseController();

passRouter.post("/forgot-password", sendForgotPasswordController.handle);
passRouter.post("/password/reset", resetPasswordController.handle);

export {
     passRouter
}
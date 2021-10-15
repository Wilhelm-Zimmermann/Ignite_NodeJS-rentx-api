import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { resolve } from "path";

@injectable()
class SendForgotPasswordUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsProvider")
        private dayJsProvider: IDateProvider,
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
        if (!user) {
            throw new AppError("User does not exists");
        }

        const token = uuidv4();
        const expires_date = this.dayJsProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            email,
            "Password Recovery",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordUseCase };
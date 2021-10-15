import { DayJsProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsProvider";
import { MailProviderInMem } from "../../../../shared/container/providers/mailProvider/in-memory/MailProviderInMem";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMem } from "../../repositories/in-memory/UsersRepositoryInMem";
import { UsersTokensRepositoryInMem } from "../../repositories/in-memory/UsersTokensRepositoryInMem";
import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";


let sendForgotPasswordUseCase: SendForgotPasswordUseCase;
let usersTokensRepository: UsersTokensRepositoryInMem;
let usersRepository: UsersRepositoryInMem;
let dateProvider: DayJsProvider;
let mailProvider: MailProviderInMem;

describe("Password reset", () => {

    beforeEach(() => {
        usersRepository = new UsersRepositoryInMem();
        usersTokensRepository = new UsersTokensRepositoryInMem();
        dateProvider = new DayJsProvider();
        mailProvider = new MailProviderInMem();
        sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
            usersRepository,
            usersTokensRepository,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send forgot password to an existing user", async () => {
        const sendMail = jest.spyOn(mailProvider,"sendMail");

        await usersRepository.create({
            driver_license: "xxxxx",
            name: "Joseph",
            email: "joseph@gmail.com",
            password: "1234",
        });

        await sendForgotPasswordUseCase.execute("joseph@gmail.com");
        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send forgot password to a non existing user", async () => {
        const sendMail = jest.spyOn(mailProvider,"sendMail");
        
        await expect(sendForgotPasswordUseCase.execute("joseh@gmail.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create a new UsersTokens", async () => {
        const userToken = jest.spyOn(usersTokensRepository, "create");
        
        await usersRepository.create({
            driver_license: "xxxxx",
            name: "Joseph",
            email: "joseph@gmail.com",
            password: "1234",
        });

        await sendForgotPasswordUseCase.execute(
            "joseph@gmail.com"
        );

        expect(userToken).toHaveBeenCalled();
    })
});
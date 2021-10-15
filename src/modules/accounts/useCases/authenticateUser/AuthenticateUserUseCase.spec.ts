import { DayJsProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMem } from "../../repositories/in-memory/UsersRepositoryInMem";
import { UsersTokensRepositoryInMem } from "../../repositories/in-memory/UsersTokensRepositoryInMem";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userTokenRepository: UsersTokensRepositoryInMem;
let dateProvider : DayJsProvider;
let userRepository: UsersRepositoryInMem;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepository = new UsersRepositoryInMem();
        dateProvider = new DayJsProvider();
        userTokenRepository = new UsersTokensRepositoryInMem();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            userTokenRepository,
            dateProvider,
        );
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "09823094",
            email: "test@gmail.com",
            password: "234",
            name: "test"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate non existing user", async () => {
        await expect(authenticateUserUseCase.execute({
            email: "none@gmail.com",
            password: "nonExists"
        })
        ).rejects.toEqual(new AppError("Email or Password invalid", 400));
    })

    it("should not be able to authenticate with invalid password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "09823094",
            email: "testNON@gmail.com",
            password: "234",
            name: "testst"
        }

        createUserUseCase.execute(user);
        await expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "12322222"
        })
        ).rejects.toEqual(new AppError("Email or Password invalid", 400));
    });
});
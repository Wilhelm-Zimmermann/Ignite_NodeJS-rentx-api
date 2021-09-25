import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMem } from "../../repositories/in-memory/UsersRepositoryInMem";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase : AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepository : UsersRepositoryInMem;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepository = new UsersRepositoryInMem();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it("should be able to authenticate an user",async () => {
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

    it("should not be able to authenticate non existing user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "none@gmail.com",
                password: "nonExists"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate with invalid password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "09823094",
                email: "testNON@gmail.com",
                password: "234",
                name: "testst"
            }

            createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "12322222"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
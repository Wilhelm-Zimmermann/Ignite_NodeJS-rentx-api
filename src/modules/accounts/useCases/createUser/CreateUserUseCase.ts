import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";


@injectable()
class CreateUserUseCase{

    constructor(@inject("UserRepository") private userRepository: IUsersRepository){}

    async execute({ name, password, driver_license, email }:ICreateUserDTO):Promise<void>{

        const userExists = await this.userRepository.findByEmail(email);

        if(userExists){
            throw new AppError("User already exists",400);
        }

        const hashPassword = await hash(password, 8);
        password = hashPassword;

        await this.userRepository.create({
            name,
            password, 
            driver_license, 
            email, 
        });
    }
}

export { CreateUserUseCase };
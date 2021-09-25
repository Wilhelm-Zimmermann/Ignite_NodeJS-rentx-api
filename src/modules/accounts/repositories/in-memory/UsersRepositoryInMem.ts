import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMem implements IUsersRepository {

    users: User[] = []

    async create({ driver_license, name, email, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driver_license, 
            name, 
            email, 
            password
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(x => x.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(x => x.id === id);
    }

}

export { UsersRepositoryInMem };
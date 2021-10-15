import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest{
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokens: IUsersTokensRepository,
        @inject("DayJsProvider")
        private dayJsProvider: IDateProvider,
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ token, password }:IRequest) {
        const userToken = await this.usersTokens.findByRefreshToken(token);

        if(!userToken){
            throw new AppError("Invalid token!");
        }
        const now = this.dayJsProvider.getDate();

        const tokenExpired = this.dayJsProvider.compareIfBefore(
            userToken.expires_date,
            now,
        );

        if(tokenExpired){
            throw new AppError("This token was expired!");
        }

        const user = await this.userRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);

        await this.userRepository.create(user);
        await this.usersTokens.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
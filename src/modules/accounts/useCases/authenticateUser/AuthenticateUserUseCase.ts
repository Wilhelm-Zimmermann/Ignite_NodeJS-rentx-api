import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsProvider")
        private dayJsProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or Password invalid", 400);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or Password invalid", 400);
        }

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expiresIn
        });

        const refresh_token = sign({ email: user.email }, auth.secret_refresh_token,{
            subject: user.id,
            expiresIn: auth.expiresInRefreshToken,
        });

        const refresh_token_expire_date = this.dayJsProvider.addDays(
            auth.expiresRefreshTokenDays
        );

        await this.usersTokensRepository.create({
            refresh_token,
            user_id: user.id,
            expires_date:refresh_token_expire_date ,
        });

        const tokenReturn: IResponse = {
            refresh_token,
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
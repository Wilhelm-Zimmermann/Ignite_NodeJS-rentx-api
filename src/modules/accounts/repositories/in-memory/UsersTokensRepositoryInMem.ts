import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMem implements IUsersTokensRepository {

    private usersTokens: UserToken[] = []

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token
        });

        this.usersTokens.push(userToken);
        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        return this.usersTokens.find(
            x =>
                x.user_id === user_id
                && x.refresh_token === refresh_token
        );
    }
    async deleteById(id: string): Promise<void> {
        const user = this.usersTokens.find(x => x.id === id);
        this.usersTokens.splice(
            this.usersTokens.indexOf(user)
        );
    }
    async findByRefreshToken(token: string): Promise<UserToken> {
        return this.usersTokens.find(x => x.refresh_token === token);
    }

}

export { UsersTokensRepositoryInMem };
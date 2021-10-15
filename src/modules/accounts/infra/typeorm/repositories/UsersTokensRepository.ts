import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository{

    private repository: Repository<UserToken>;

    constructor(){
        this.repository = getRepository(UserToken);
    }
    
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });
        
        await this.repository.save(userToken);
        
        return userToken;
    }
    
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string):Promise<UserToken>{
        const userToken = this.repository.findOne({
            user_id,
            refresh_token
        });
        return userToken;
    }
    
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    async findByRefreshToken(token: string): Promise<UserToken> {
        return await this.repository.findOne({
            refresh_token: token
        });
    }
}

export { UsersTokensRepository };1
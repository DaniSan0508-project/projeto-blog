import { AppDataSource } from "../data-source";
import { User } from "../domain/User";
import { IUserRepository } from "./IUserRepository";

export class userRepository implements IUserRepository {
    private repository = AppDataSource.getRepository(User);

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOneBy({ email });
        return user;
    }

    async save(user: User): Promise<User> {
        const userSalvo = await this.repository.save(user);
        return userSalvo;
    }
}
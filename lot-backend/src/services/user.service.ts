import { DeleteResult } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async removeById(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}

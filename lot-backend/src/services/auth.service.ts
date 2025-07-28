import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { JwtUtils } from "../utils/jwt";
import { Token } from "../types/global";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async register(user: User): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { email: user.email } });
    if (exists) throw new Error("Email already registered");

    const userFromDb = this.userRepo.create(user);
    return await this.userRepo.save(userFromDb);
  }

  async login(email: string, password: string): Promise<Token> {

    const userFromDb = await this.userRepo.findOne({ where: { email } });
    if (!userFromDb) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, userFromDb.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = JwtUtils.generateToken({ id: userFromDb.id, email: userFromDb.email, role: userFromDb.role });
    return { token };
  }

  static verifyToken(token: string) {
    return JwtUtils.verifyToken(token);
  }


  async getUserFromToken(token: string): Promise<User | null> {
    try {
      token = token.replace('Bearer ', '');

      const payload = JwtUtils.verifyToken(token) as { id: number };

      const user = await this.userRepo.findOneBy({ id: payload.id });

      return user;
    } catch (err) {
      console.error('Invalid Token:', err);
      return null;
    }
  }

}

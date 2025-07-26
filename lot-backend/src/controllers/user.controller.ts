import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/User";

export class UserController{
    private userService: UserService;
    constructor(){
        this.userService = new UserService();
    }

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };

  addUser = async (req: Request, res: Response): Promise<void> => {
    const user: User = req.body as User;
    const newUser = await this.userService.createUser(user);
    res.status(201).json(newUser);
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const users = await this.userService.removeById(id);
    res.json(users);
  }; 
}

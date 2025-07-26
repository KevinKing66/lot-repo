import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { User } from "../entities/User";
import { ValidationUtils } from "../utils/validation";
import { Token } from "../types/global";


export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body as User;

            if (!ValidationUtils.isNotEmpty(user.email)) {
                res.status(400).json({ message: 'El correo es obligatorio' });
                return;
            }

            if (!ValidationUtils.isValidEmail(user.email)) {
                res.status(400).json({ message: 'El formato del correo es inválido' });
                return;
            }

            if (!ValidationUtils.isNotEmpty(user.password)) {
                res.status(400).json({ message: 'La contraseña es obligatoria' });
                return;
            }

            if (!ValidationUtils.isNotEmpty(user.role)) {
                res.status(400).json({ message: 'Debes elegir un rol' });
                return;
            }

            if (!ValidationUtils.isStrongPassword(user.password, 8)) {
                res.status(400).json({
                    message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
                });
                return;
            }

            if (!ValidationUtils.isNotEmpty(user.name)) {
                res.status(400).json({ message: 'El nombre es obligatorio' });
                return;
            }

            const userFromDb = await this.authService.register(user);
            res.status(201).json({ id: userFromDb.id, email: userFromDb.email });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw new Error("Missing fields");

            const result: Token = await this.authService.login(email, password);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

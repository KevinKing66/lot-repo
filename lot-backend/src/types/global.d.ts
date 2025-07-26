import { Request } from "express";

type Token = {
    token?: string
}

interface AuthMiddlewareRequest extends Request {
    user?: User;
}
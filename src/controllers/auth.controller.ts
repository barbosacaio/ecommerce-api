import { Request, Response } from 'express';
import { registerUser } from '../services/auth/register.service';
import { loginUser } from '../services/auth/login.service';

export class AuthController {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const result = await registerUser({
            name,
            email,
            password,
        });

        return res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await loginUser({
            email,
            password,
        });

        return res.json(result);
    }
}
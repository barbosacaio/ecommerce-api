import { Request, Response} from 'express';
import { prisma } from '../database/prisma';

export class UsersController {
    async me(request: Request, response: Response) {
        const userId = request.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                created_at: true,
            },
        });

        return response.json(user);
    }
}
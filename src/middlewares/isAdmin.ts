import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';

export async function isAdmin(request: Request, response: Response, next: NextFunction) {
    const userId = request.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId, },
        select: { role: true, },
    });

    if (!user || user.role !== 'admin') {
        return response.status(403).json({
            message: 'Access denied',
        });
    }

    return next();
}
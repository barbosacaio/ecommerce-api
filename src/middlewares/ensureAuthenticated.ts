import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayLoad {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: 'Token missing',
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, env.jwtSecret) as TokenPayLoad;

        request.user = {
            id: decoded.sub,
        };

        return next();
    } catch {
        return response.status(401).json({
            message: 'Invalid token',
        });
    }
}
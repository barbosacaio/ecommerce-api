import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '1d';

export function generateToken(userId: string): string {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_SECRET!,
        { expiresIn: JWT_EXPIRES_IN }
    );
}
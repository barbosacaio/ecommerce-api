import { prisma } from '../../database/prisma';
import { hashPassword } from '../password.service';
import { generateToken } from './jwt.service';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export async function registerUser({
    name,
    email,
    password,
}: RegisterInput){
    const userAlreadyExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userAlreadyExists) {
        throw new Error('User already exists');
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    });

    const token = generateToken(user.id);

    return {
        user,
        token,
    };
}
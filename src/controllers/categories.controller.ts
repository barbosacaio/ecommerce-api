import { Request, Response} from 'express';
import { prisma } from '../database/prisma';

export class CategoriesController {
    // POST /categories
    async create(request: Request, response: Response) {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({ message: 'Category name is required.' });
        }

        const categoryExists = await prisma.category.findFirst({
            where: { name },
        });

        if (categoryExists) {
            return response.status(409).json({ message: 'Category already exists.' });
        }

        const category = await prisma.category.create({
            data: { name },
        });

        return response.status(201).json(category);
    }

    // GET /categories
    async list(request: Request, response: Response) {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
        });

        return response.json(categories);
    }
}
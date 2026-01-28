import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class ProductsController {
    // POST /products
    async create(request: Request, response: Response) {
        const { name, description, price, categoryIds } = request.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                categories: {
                    connect: categoryIds.map((id: string) => ({ id, })),
                },
            },
        });

        return response.status(201).json(product);
    }

    // PUT /products/:id
    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, description, price, categoryIds } = request.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                categories: {
                    set: [],
                    connect: categoryIds.map((id: string) => ({ id, })),
                },
            },
        });

        return response.status(200).json(product);
    }

    // DELETE /products/:id
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await prisma.product.delete({
            where: { id },
        });

        return response.status(204).send();
    }

    // GET /products
    async list(request: Request, response: Response) {
        const products = await prisma.product.findMany({
            include: {
                categories: true,
            },
        });

        return response.status(200).json(products);
    }
}
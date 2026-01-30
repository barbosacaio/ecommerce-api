import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string().min(3),
        price: z.number().int().positive(),
        stock: z.number().int().nonnegative(),
        categoryIds: z.array(z.string().uuid()).min(1),
    }),
});
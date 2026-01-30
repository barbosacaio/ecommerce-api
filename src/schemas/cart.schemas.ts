import { z } from 'zod';

export const addCartItemSchema = z.object({
    body: z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
    }),
});

export const updateCartItemSchema = z.object({
    params: z.object({
        itemId: z.string().uuid(),
    }),

    body: z.object({
        quantity: z.number().int().positive(),
    }),
});
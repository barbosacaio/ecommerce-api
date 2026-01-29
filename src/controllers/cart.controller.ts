import { Request, Response} from 'express';
import { prisma } from '../database/prisma';

export class CartController {
    // POST /cart/items
    async addItem(request: Request, response: Response) {
        const userId = request.user.id;
        const { productId, quantity } = request.body;

        const qty = quantity ?? 1;

        // Verify the product
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }

        // Search/create cart
        let cart = await prisma.cart.findUnique({
            where: { user_id: userId },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { user_id: userId },
            });
        }

        // Checks if the item already exists
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cart_id_product_id: {
                    cart_id: cart.id,
                    product_id: productId,
                },
            },
        });

        if (existingItem) {
            const updated = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + qty },
            });

            return response.json(updated);
        }

        // Creates new item
        const item = await prisma.cartItem.create({
            data: {
                cart_id: cart.id,
                product_id: productId,
                quantity: qty,
                price: product.price,
            },
        });

        return response.status(201).json(item);
    }

    // PATCH /cart/items/:id
    async updateItem(request: Request, response: Response) {
        const userId = request.user.id;
        const { id } = request.params;
        const { quantity } = request.body;

        if (!quantity || quantity < 1) {
            return response.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const item = await prisma.cartItem.findUnique({
            where: { id },
            include: { cart: true },
        });

        if (!item) {
            return response.status(404).json({ message: 'Cart item not found' });
        }

        // Ensure the cart's ownership
        if (item.cart.user_id !== userId) {
            return response.status(403).json({ message: 'Forbidden' });
        }

        const updated = await prisma.cartItem.update({
            where: { id },
            data: { quantity },
        });

        return response.json(updated);
    }

    // DELETE /cart/items/:id
    async removeItem(request: Request, response: Response) {
        const userId = request.user.id;
        const { id } = request.params;

        const item = await prisma.cartItem.findUnique({
            where: { id },
            include: { cart: true },
        });

        if (!item) {
            return response.status(404).json({ message: 'Cart item not found' });
        }

        // Ensure the cart's ownership
        if (item.cart.user_id !== userId) {
            return response.status(403).json({ message: 'Forbidden' });
        }

        await prisma.cartItem.delete({
            where: { id },
        });

        return response.status(204).send();
    }
}
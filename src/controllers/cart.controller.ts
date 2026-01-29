import { Request, Response} from 'express';
import { prisma } from '../database/prisma';

export class CartController {
    // POST /cart
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
}
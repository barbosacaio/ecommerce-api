import { Request, Response} from 'express';
import { prisma } from '../database/prisma';

export class OrdersController {
    // POST /orders
    async createOrder(request: Request, response: Response) {
        const userId = request.user.id;
        const cart = await prisma.cart.findUnique({
            where: { user_id: userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart || cart.items.length === 0) {
            return response.status(400).json({ error: 'Cart is empty' });
        }

        const total = cart.items.reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);

        const order = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    user_id: userId,
                    status: 'PENDING',
                    total,
                },
            });
            
            await tx.orderItem.createMany({
                data: cart.items.map((item) => ({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.price,
                })),
            });

            for (const item of cart.items) {
                if (item.product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ${item.product.name}`);
                }

                await tx.product.update({
                    where: { id: item.product_id },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            await tx.cartItem.deleteMany({
                where: { cart_id: cart.id },
            });

            return order;
        });

        return response.status(201).json(order);
    }
}
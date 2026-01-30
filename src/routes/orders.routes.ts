import { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/', ensureAuthenticated, ordersController.createOrder.bind(ordersController));

export { ordersRoutes };
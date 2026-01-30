import { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.get('/my', ensureAuthenticated, ordersController.getOrders.bind(ordersController));
ordersRoutes.post('/', ensureAuthenticated, ordersController.createOrder.bind(ordersController));

export { ordersRoutes };
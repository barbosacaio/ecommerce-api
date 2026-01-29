import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();
const cartController = new CartController();

router.post('/cart/items', ensureAuthenticated, cartController.addItem);

export { router as cartRoutes };
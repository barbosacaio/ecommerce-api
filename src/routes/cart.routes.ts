import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();
const cartController = new CartController();

router.get('/', ensureAuthenticated, cartController.getCart.bind(cartController));
router.post('/items', ensureAuthenticated, cartController.addItem);
router.patch('/items/:id', ensureAuthenticated, cartController.updateItem);
router.delete('/items/:id', ensureAuthenticated, cartController.removeItem);

export { router as cartRoutes };
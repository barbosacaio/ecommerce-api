import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { validate } from '../middlewares/validate';
import { addCartItemSchema } from '../schemas/cart.schemas';
import { updateCartItemSchema } from '../schemas/cart.schemas';

const router = Router();
const cartController = new CartController();

router.get('/', ensureAuthenticated, cartController.getCart.bind(cartController));
router.post('/items', validate(addCartItemSchema), ensureAuthenticated, cartController.addItem);
router.patch('/items/:id', validate(updateCartItemSchema), ensureAuthenticated, cartController.updateItem);
router.delete('/items/:id', ensureAuthenticated, cartController.removeItem);

export { router as cartRoutes };
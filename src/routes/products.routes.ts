import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);
productsRoutes.use(isAdmin);

// Product routes
productsRoutes.post('/', productsController.create);
productsRoutes.put('/:id', productsController.update);
productsRoutes.delete('/:id', productsController.delete);
productsRoutes.get('/', productsController.list);

export { productsRoutes };
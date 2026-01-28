import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';

const productsRoutes = Router();
const productsController = new ProductsController();

// Product routes
productsRoutes.post('/', ensureAuthenticated, isAdmin, productsController.create);
productsRoutes.put('/:id', ensureAuthenticated, isAdmin, productsController.update);
productsRoutes.delete('/:id', ensureAuthenticated, isAdmin, productsController.delete);
productsRoutes.get('/', productsController.list);

export { productsRoutes };
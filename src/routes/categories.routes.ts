import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, isAdmin, categoriesController.create);
categoriesRoutes.get('/', categoriesController.list);

export { categoriesRoutes };
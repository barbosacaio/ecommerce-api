import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get(
    '/me',
    ensureAuthenticated,
    usersController.me
);

export { usersRoutes };
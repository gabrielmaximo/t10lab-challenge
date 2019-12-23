import { Router } from 'express';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AddressController from './app/controllers/AddressController';

// Validators
import UserStore from './app/validators/UserStore';
import SessionStore from './app/validators/SessionStore';
import AddressStore from './app/validators/AddressStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Desafio t10lab' }));

// users
routes.post('/users', UserStore, UserController.store);

// session
routes.post('/sessions', SessionStore, SessionController.store);

// active global authenticate middleware
routes.use(authMiddleware);

// address
routes.post('/users/addresses', AddressStore, AddressController.store);

export default routes;

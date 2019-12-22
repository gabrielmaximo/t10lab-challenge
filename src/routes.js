import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';

// Validators
import UserStore from './app/validators/UserStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Desafio t10lab' }));

// users
routes.post('/users', UserStore, UserController.store);

export default routes;

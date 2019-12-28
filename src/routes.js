/* eslint-disable prettier/prettier */
import { Router } from 'express';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PersonController from './app/controllers/PersonController';
import AddressController from './app/controllers/AddressController';

// Validators
import UserStore from './app/validators/UserStore';
import SessionStore from './app/validators/SessionStore';
import PersonStore from './app/validators/PersonStore';
import PersonUpdate from './app/validators/PersonUpdate';
import AddressUpdate from './app/validators/AddressUpdate';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Desafio t10lab' }));

// users - create
routes.post('/users', UserStore, UserController.store);

// session - login
routes.post('/sessions', SessionStore, SessionController.store);

// active global authenticate middleware
routes.use(authMiddleware);

// Person
routes.get('/users/persons', PersonController.index);
routes.post('/users/persons', PersonStore, PersonController.store);
routes.put('/users/persons/:id', PersonUpdate, PersonController.update);
routes.delete('/users/persons/:id', PersonController.delete);

// Address
routes.get('/addresses', AddressController.index);
routes.put('/addresses/persons/:personId', AddressUpdate, AddressController.update);
routes.delete('/addresses/persons/:personId', AddressController.delete);

export default routes;

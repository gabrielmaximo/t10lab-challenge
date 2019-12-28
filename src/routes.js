/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { join } from 'path'

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

// docs - html documentation
routes.get('/', (req, res) => (res.sendFile(join(`${__dirname}/../docs/index.html`))));

// users - create
routes.post('/users', UserStore, UserController.store);

// sessions - login
routes.post('/sessions', SessionStore, SessionController.store);

// active global authenticate middleware
routes.use(authMiddleware);

// Persons
routes.get('/users/persons', PersonController.index);
routes.post('/users/persons', PersonStore, PersonController.store);
routes.put('/users/persons/:id', PersonUpdate, PersonController.update);
routes.delete('/users/persons/:id', PersonController.delete);

// Addresses
routes.get('/addresses', AddressController.index);
routes.put('/addresses/persons/:personId', AddressUpdate, AddressController.update);
routes.delete('/addresses/persons/:personId', AddressController.delete);

export default routes;

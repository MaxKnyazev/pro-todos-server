import Router from 'express';
import usersControllers from './users.controllers.js';

const usersRoutes = Router();

usersRoutes.route('/')
  .get(usersControllers.getAllUsers);

export { usersRoutes };
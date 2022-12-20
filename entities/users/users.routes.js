import Router from 'express';
import usersControllers from './users.controllers.js';

const usersRoutes = Router();

usersRoutes.route('/')
  .get(usersControllers.getAllUsers);

usersRoutes.route('/delete/:id')
  .delete(usersControllers.deleteUser);

usersRoutes.route('/edit/:id')
  .put(usersControllers.editUser);

export { usersRoutes };
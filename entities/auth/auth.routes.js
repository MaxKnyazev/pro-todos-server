import Router from 'express';
import authControllers from './auth.controllers.js';
import { check } from 'express-validator';

const authRoutes = Router();

authRoutes.route('/registration')
  .post([
    check('email', 'Email не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть пустым').notEmpty(),
    check('password', 'Длина пароля не может быть меньше 5-и символов').isLength({
      min: 5,
    })
  ], authControllers.registration);

authRoutes.route('/login')
  .post(authControllers.login);

authRoutes.route('/confirm')
  .get(authControllers.confirm);


export { authRoutes };
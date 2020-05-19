import { Router } from 'express';

import SessionsCtrl from '../controllers/SessionsCtrl';
import UserAuthenticator from '@modules/users/services/UserAuthenticator';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { celebrate, Segments } from 'celebrate';
import Joi from '@hapi/joi';

const router = Router();
const controller = new SessionsCtrl();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create
);

export default router;

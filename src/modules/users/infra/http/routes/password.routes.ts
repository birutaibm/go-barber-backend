import { Router } from 'express';

import ForgotPasswordCtrl from '../controllers/ForgotPasswordCtrl';
import ResetPasswordCtrl from '../controllers/ResetPasswordCtrl';
import { celebrate, Segments } from 'celebrate';
import Joi from '@hapi/joi';

const router = Router();
const forgot = new ForgotPasswordCtrl();
const reset = new ResetPasswordCtrl();

router.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgot.create
);
router.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  reset.create
);

export default router;

import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileCtrl from '../controllers/ProfileCtrl';
import { celebrate, Segments } from 'celebrate';
import Joi from '@hapi/joi';

const router = Router();
const profileCtrl = new ProfileCtrl();

router.use(ensureAuthenticated);

router.get('/', profileCtrl.show);
router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      old_password: Joi.string(),
    },
  }),
  profileCtrl.update
);

export default router;

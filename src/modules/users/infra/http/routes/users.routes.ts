import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UserCtrl from '../controllers/UserCtrl';
import UserAvatarCtrl from '../controllers/UserAvatarCtrl';
import { celebrate, Segments } from 'celebrate';
import Joi from '@hapi/joi';

const router = Router();
const upload = multer(uploadConfig);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserCtrl.create
);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarCtrl.update
);

export default router;

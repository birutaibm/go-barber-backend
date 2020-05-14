import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UserCtrl from '../controllers/UserCtrl';
import UserAvatarCtrl from '../controllers/UserAvatarCtrl';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', UserCtrl.create);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarCtrl.update
);

export default router;

import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UserCreator from '../services/UserCreator';
import UserAvatarUpdater from '../services/UserAvatarUpdater';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const creator = new UserCreator();
    const user = await creator.execute({ name, email, password });

    delete user.password;
    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updater = new UserAvatarUpdater();
    const user = await updater.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });
  },
);

export default router;

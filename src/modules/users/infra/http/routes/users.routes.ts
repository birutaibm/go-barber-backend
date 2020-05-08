import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UserCreator from '@modules/users/services/UserCreator';
import UserAvatarUpdater from '@modules/users/services/UserAvatarUpdater';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const creator = new UserCreator(new UsersRepository(), new BCryptHashProvider());
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
    const updater = new UserAvatarUpdater(new UsersRepository(), new DiskStorageProvider());
    const user = await updater.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });
  },
);

export default router;

import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import container from '@shared/container';
import UserAvatarUpdater from '@modules/users/services/UserAvatarUpdater';

export default class UserAvatarCtrl {
  public static async update(request: Request, response: Response) {
    try {
      const updater = new UserAvatarUpdater(
        container.get('UsersRepository'),
        container.get('StorageProvider')
      );
      const user = await updater.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

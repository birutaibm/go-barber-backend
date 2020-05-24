import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import container from '@shared/container';
import UserAvatarUpdater from '@modules/users/services/UserAvatarUpdater';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class UserAvatarCtrl {
  constructor() {
    container.inject<UserAvatarUpdater>('UserAvatarUpdater', {
      creator: (u: IUsersRepository, s: IStorageProvider) =>
        new UserAvatarUpdater(u, s),
      dependencies: ['UsersRepository', 'StorageProvider']
    });
  }
  public async update(request: Request, response: Response) {
    const updater = container.resolve<UserAvatarUpdater>('UserAvatarUpdater');
    const user = await updater.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

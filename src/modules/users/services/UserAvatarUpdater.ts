import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface UserAvatarDTO {
  userId: string;
  avatarFilename: string;
}

export default class UserAvatarUpdater {
  constructor(
    private users: IUsersRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    userId,
    avatarFilename,
  }: UserAvatarDTO): Promise<User> {
    const user = await this.users.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = await this.storageProvider.saveFile(avatarFilename);
    return await this.users.save(user);
  }
}

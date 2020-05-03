import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface UserAvatarDTO {
  userId: string;
  avatarFilename: string;
}
export default class UserAvatarUpdater {
  public async execute({
    userId,
    avatarFilename,
  }: UserAvatarDTO): Promise<User> {
    const users = getRepository(User);
    const user = await users.findOne(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const oldFilePath = path.join(uploadConfig.directory, user.avatar);
      const oldFileExists = await fs.promises.stat(oldFilePath);
      if (oldFileExists) {
        await fs.promises.unlink(oldFilePath);
      }
    }

    user.avatar = avatarFilename;
    await users.save(user);

    return user;
  }
}

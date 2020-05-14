import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface ProfileUpdaterInputDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

class ProfileUpdater {
  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute(data: ProfileUpdaterInputDTO): Promise<User> {
    const user = await this.repository.findById(data.user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.email !== data.email) {
      const conflictingUser = await this.repository.findByEmail(data.email);
      if (conflictingUser) {
        throw new AppError('E-mail is already registered to another user.');
      }
    }

    user.name = data.name;
    user.email = data.email;
    if (data.password) {
      if (data.old_password) {
        if (await this.hashProvider.compareHash(data.old_password, user.password)) {
          user.password = await this.hashProvider.generateHash(data.password);
        } else {
          throw new AppError('Wrong old password');
        }
      } else {
        throw new AppError('Old password is required to reset password');
      }
    }

    return this.repository.save(user);
  }
}

export default ProfileUpdater;

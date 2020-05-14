import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface ProfileShowerInputDTO {
  user_id: string;
}

class ProfileShower {
  constructor(
    private repository: IUsersRepository,
  ) {}

  public async execute(data: ProfileShowerInputDTO): Promise<User> {
    const user = await this.repository.findById(data.user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;

    return user;
  }
}

export default ProfileShower;

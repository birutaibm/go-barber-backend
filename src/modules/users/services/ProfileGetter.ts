import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface ProfileGetterInputDTO {
  user_id: string;
}

export default class ProfileGetter {
  constructor(
    private repository: IUsersRepository,
  ) {}

  public async execute(data: ProfileGetterInputDTO): Promise<User> {
    const user = await this.repository.findById(data.user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

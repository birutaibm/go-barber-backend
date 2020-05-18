import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUserCreationDTO from '../dtos/IUserCreationDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

class UserCreator {
  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider,
    private cache: ICacheProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IUserCreationDTO): Promise<User> {
    const conflictingUser = await this.repository.findByEmail(email);

    if (conflictingUser) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.repository.create({ name, email, password: hashedPassword });
    await this.cache.invalidatePrefix('providers-list');
    return user;
  }
}

export default UserCreator;

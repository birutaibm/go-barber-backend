import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUserCreationDTO from '../dtos/IUserCreationDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

class UserCreator {
  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider
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
    return user;
  }
}

export default UserCreator;

import 'dotenv/config';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface UserAuthenticationDTO {
  email: string;
  password: string;
}

interface UserAuthenticatedDTO {
  user: User;
  token: string;
}

class UserAuthenticator {
  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: UserAuthenticationDTO): Promise<UserAuthenticatedDTO> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid e-mail/password', 401);
    }

    const validPassword = await this.hashProvider.compareHash(password, user.password);
    if (!validPassword) {
      throw new AppError('Invalid e-mail/password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default UserAuthenticator;

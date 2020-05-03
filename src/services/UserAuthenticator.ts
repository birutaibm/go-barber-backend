import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface UserAuthenticationDTO {
  email: string;
  password: string;
}

interface UserAuthenticatedDTO {
  user: User;
  token: string;
}

class UserAuthenticator {
  public async execute({
    email,
    password,
  }: UserAuthenticationDTO): Promise<UserAuthenticatedDTO> {
    const repository = getRepository(User);
    const user = await repository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid e-mail/password', 401);
    }

    const validPassword = await compare(password, user.password);
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

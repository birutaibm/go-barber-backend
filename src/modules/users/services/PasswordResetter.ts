import { addHours } from 'date-fns';

import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Input {
  password: string;
  token: string;
}

export default class PasswordResetter {
  constructor(
    private users: IUsersRepository,
    private tokens: IUserTokenRepository,
    private hash: IHashProvider
  ) {}

  public async execute({password, token}: Input): Promise<void> {
    const userToken = await this.tokens.findByToken(token);
    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const expiriesAt = addHours(userToken.createdAt, 2);
    if (expiriesAt.getTime() < Date.now()) {
      throw new AppError('Expired token');
    }

    const user = await this.users.findById(userToken.user_id);
    if (!user) {
      throw new AppError('Token has no user', 500);
    }

    user.password = await this.hash.generateHash(password);
    await this.users.save(user);
  }
}

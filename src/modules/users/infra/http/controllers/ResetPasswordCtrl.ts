import { Request, Response } from 'express';
import PasswordResetter from '@modules/users/services/PasswordResetter';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import container from '@modules/users/providers';

export default class ResetPasswordCtrl {
  constructor() {
    const creator =
      (u: IUsersRepository, t: IUserTokenRepository, h: IHashProvider) =>
        new PasswordResetter(u, t, h);
    container.inject<PasswordResetter>(
      'PasswordResetter',
      {
        creator,
        dependencies: ['UsersRepository', 'UserTokensRepository', 'HashProvider']
      }
    );
  }

  public async create(request: Request, response: Response) {
    const { password, token } = request.body;

    await container.resolve('PasswordResetter').execute({ password, token });

    return response.sendStatus(204);
  }
}

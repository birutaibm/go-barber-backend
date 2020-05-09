import { Request, Response } from 'express';
import PasswordResetter from '@modules/users/services/PasswordResetter';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../../typeorm/repositories/UserTokensRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

export default class ResetPasswordCtrl {
  private service: PasswordResetter;

  private getService() {
    if (!this.service) {
      const users = new UsersRepository();
      const tokens = new UserTokensRepository();
      const hash = new BCryptHashProvider();
      this.service = new PasswordResetter(users, tokens, hash);
    }
    return this.service;
  }

  public async create(request: Request, response: Response) {
    const { password, token } = request.body;

    await this.getService().execute({ password, token });

    return response.sendStatus(204);
  }
}

import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import container from '@shared/container';
import UserAuthenticator from '@modules/users/services/UserAuthenticator';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class SessionsCtrl {
  constructor() {
    container.inject<UserAuthenticator>('UserAuthenticator', {
      creator: (u: IUsersRepository, h: IHashProvider) =>
        new UserAuthenticator(u, h),
      dependencies: ['UsersRepository', 'HashProvider'],
    });
  }

  public async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticator = container.resolve<UserAuthenticator>('UserAuthenticator');
    const { user, token } = await authenticator.execute({ email, password });

    return response.status(201).json({ user: classToClass(user), token });
  }
}

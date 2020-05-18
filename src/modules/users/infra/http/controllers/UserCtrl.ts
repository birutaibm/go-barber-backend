import { Request, Response } from 'express';
import container from '@shared/container';
import UserCreator from '@modules/users/services/UserCreator';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class UserCtrl {
  constructor() {
    container.inject<UserCreator>('UserCreator', {
      creator: (u: IUsersRepository, h: IHashProvider, c: ICacheProvider) =>
        new UserCreator(u, h, c),
      dependencies: ['UsersRepository', 'HashProvider', 'CacheProvider']
    })
  }

  public static async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const creator = container.resolve('UserCreator') as UserCreator;
      const user = await creator.execute({ name, email, password });

      delete user.password;
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

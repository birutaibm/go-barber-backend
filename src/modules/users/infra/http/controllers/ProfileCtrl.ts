import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import container from '@shared/container';
import ProfileUpdater from '@modules/users/services/ProfileUpdater';
import ProfileGetter from '@modules/users/services/ProfileGetter';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class ProfileCtrl {
  constructor() {
    container.inject<ProfileUpdater>('ProfileUpdater', {
      creator: (u: IUsersRepository, h: IHashProvider) => new ProfileUpdater(u, h),
      dependencies: ['UsersRepository', 'HashProvider'],
    });
    container.inject<ProfileGetter>('ProfileGetter', {
      creator: (u: IUsersRepository) => new ProfileGetter(u),
      dependencies: ['UsersRepository'],
    });
  }

  public async show(request: Request, response: Response) {
    const user_id = request.user.id;
    const service = container.resolve('ProfileGetter') as ProfileGetter;

    const user = await service.execute({user_id});

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password,
    } = request.body;
    const service = container.resolve('ProfileUpdater') as ProfileUpdater;
    const user = await service.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(classToClass(user));
  }
}

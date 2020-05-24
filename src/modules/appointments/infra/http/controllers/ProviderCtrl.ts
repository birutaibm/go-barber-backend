import { Request, Response } from 'express';
import ProvidersListService from '@modules/appointments/services/ProvidersListService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import container from '@shared/container';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class ProviderCtrl {
  constructor() {
    const creator = (repo: IUsersRepository, cache: ICacheProvider) =>
      new ProvidersListService(repo, cache);
    container.inject<ProvidersListService>('ProvidersListService', {
      creator,
      dependencies: ['UsersRepository', 'CacheProvider'],
    });
  }

  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const providers = await container
      .resolve<ProvidersListService>('ProvidersListService')
      .execute(user_id);

    return response.json(providers);
  }
}

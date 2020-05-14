import { Request, Response } from 'express';
import ProvidersListService from '@modules/appointments/services/ProvidersListService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import container from '../../container';

export default class ProviderCtrl {
  constructor() {
    const creator = (repo: IUsersRepository) => new ProvidersListService(repo);
    container.inject<ProvidersListService>('ProvidersListService', {
      creator,
      dependencies: ['UsersRepository'],
    });
  }

  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const providers = await container
      .resolve('ProvidersListService')
      .execute(user_id);

    return response.json(providers);
  }
}

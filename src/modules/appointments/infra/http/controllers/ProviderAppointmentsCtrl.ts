import { Request, Response } from 'express';

import ProviderAppointmentsGetter from '@modules/appointments/services/ProviderAppointmentsGetter';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import container from '@shared/container';

export default class ProviderAppointmentsCtrl {
  constructor() {
    const creator = (repo: IAppointmentsRepository, cache: ICacheProvider) =>
      new ProviderAppointmentsGetter(repo, cache);
    container.inject<ProviderAppointmentsGetter>('ProviderAppointmentsGetter', {
      creator,
      dependencies: ['AppointmentsRepository', 'CacheProvider'],
    });
  }

  public async index(request: Request, response: Response) {
    const service = container.resolve('ProviderAppointmentsGetter') as ProviderAppointmentsGetter;
    const { day, month, year } = request.body;
    const provider_id = request.user.id;

    const appointments = await service.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

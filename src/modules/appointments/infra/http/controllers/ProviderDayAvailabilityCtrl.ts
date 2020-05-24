import { Request, Response } from 'express';

import DayAvailabilityGetter from '@modules/appointments/services/DayAvailabilityGetter';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import container from '@shared/container';

export default class ProviderDayAvailabilityCtrl {
  constructor() {
    const creator = (repo: IAppointmentsRepository) => new DayAvailabilityGetter(repo);
    container.inject<DayAvailabilityGetter>('DayAvailabilityGetter', {
      creator,
      dependencies: ['AppointmentsRepository'],
    });
  }

  public async index(request: Request, response: Response) {
    const service = container.resolve<DayAvailabilityGetter>('DayAvailabilityGetter');
    const { day, month, year } = request.query;
    const { provider_id } = request.params;

    const result = await service.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(result);
  }
}

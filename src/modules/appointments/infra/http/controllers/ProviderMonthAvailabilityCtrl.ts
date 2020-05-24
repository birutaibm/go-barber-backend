import { Request, Response } from 'express';

import MonthAvailabilityGetter from '@modules/appointments/services/MonthAvailabilityGetter';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import container from '@shared/container';

export default class ProviderMonthAvailabilityCtrl {
  constructor() {
    const creator = (repo: IAppointmentsRepository) => new MonthAvailabilityGetter(repo);
    container.inject<MonthAvailabilityGetter>('MonthAvailabilityGetter', {
      creator,
      dependencies: ['AppointmentsRepository'],
    });
  }

  public async index(request: Request, response: Response) {
    const service = container.resolve<MonthAvailabilityGetter>('MonthAvailabilityGetter');
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const result = await service.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(result);
  }
}

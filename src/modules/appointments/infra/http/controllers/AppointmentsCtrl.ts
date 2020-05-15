import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentCreator from '@modules/appointments/services/AppointmentCreator';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import container from '@shared/container';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

export default class AppointmentsCtrl {
  constructor () {
    container.inject<AppointmentCreator>('AppointmentCreator', {
      creator:
        (a: IAppointmentsRepository, n: INotificationsRepository) =>
          new AppointmentCreator(a, n),
      dependencies: ['AppointmentsRepository', 'NotificationsRepository']
    });
  }

  public async index(request: Request, response: Response) {
    const repository = container.get('AppointmentsRepository');
    const appointments = await repository.getAll();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { provider, date } = request.body;
    const creator = container.resolve('AppointmentsCreator') as AppointmentCreator;
    const appointments = await creator.execute({
      user_id,
      provider,
      date: parseISO(date),
    });

    return response.status(201).json(appointments);
  }
}

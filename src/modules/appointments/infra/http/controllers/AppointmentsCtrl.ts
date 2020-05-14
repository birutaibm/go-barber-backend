import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentCreator from '@modules/appointments/services/AppointmentCreator';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import container from '../../container';

export default class AppointmentsCtrl {
  constructor () {
    const creator = (repo: IAppointmentsRepository) => new AppointmentCreator(repo);
    container.inject<AppointmentCreator>('AppointmentCreator', {
      creator,
      dependencies: ['AppointmentsRepository']
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
    const creator = container.resolve('AppointmentsCreator');
    const appointments = await creator.execute({
      user_id,
      provider,
      date: parseISO(date),
    });

    return response.status(201).json(appointments);
  }
}

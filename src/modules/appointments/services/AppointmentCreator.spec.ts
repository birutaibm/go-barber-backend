import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import AppointmentCreator from './AppointmentCreator';
import AppError from '@shared/errors/AppError';

describe('AppointmentCreator', () => {
  it('should be able to create a new appointment', async () => {
    const creator = new AppointmentCreator(new FakeAppointmentsRepository());
    const appointment = await creator.execute({
      date: new Date(),
      provider: '12354323',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12354323');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const creator = new AppointmentCreator(new FakeAppointmentsRepository());
    const date = new Date()
    const appointment = await creator.execute({
      date,
      provider: '12354323',
    });

    expect(creator.execute({
      date,
      provider: '12354323',
    })).rejects.toBeInstanceOf(AppError);
  });
});

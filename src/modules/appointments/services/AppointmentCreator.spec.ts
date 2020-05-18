import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppointmentCreator from './AppointmentCreator';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let creator: AppointmentCreator;
describe('AppointmentCreator', () => {
  beforeEach(() => {
    creator = new AppointmentCreator(
      new FakeAppointmentsRepository(),
      new FakeNotificationsRepository(),
      new FakeCacheProvider()
    );
  });

  it('should be able to create a new appointment', async () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const appointment = await creator.execute({
      date,
      provider: 'provider',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const appointment = await creator.execute({
      date,
      user_id: 'user',
      provider: 'provider',
    });

    await expect(creator.execute({
      date,
      user_id: 'user',
      provider: 'provider',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(creator.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user',
      provider: 'provider',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);

    await expect(creator.execute({
      date,
      user_id: 'user_id',
      provider: 'user_id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before of 8:00', async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(7);

    await expect(creator.execute({
      date,
      provider: 'provider',
      user_id: 'user',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment after of 17:00', async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(18);

    await expect(creator.execute({
      date,
      provider: 'provider',
      user_id: 'user',
    })).rejects.toBeInstanceOf(AppError);
  });
});

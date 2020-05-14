import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import MonthAvailabilityGetter from './MonthAvailabilityGetter';

let appointments: FakeAppointmentsRepository;
let service: MonthAvailabilityGetter;

describe('MonthAvailabilityGetter', () => {
  beforeEach(() => {
    appointments = new FakeAppointmentsRepository();
    service = new MonthAvailabilityGetter(appointments);
  });

  it('should be able to list the month availability from provider', async () => {
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await service.execute({
      provider_id: 'user id',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true},
      { day: 20, available: false},
      { day: 21, available: true},
      { day: 22, available: true},
    ]));
  });
});

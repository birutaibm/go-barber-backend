import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import DayAvailabilityGetter from './DayAvailabilityGetter';

let appointments: FakeAppointmentsRepository;
let service: DayAvailabilityGetter;

describe('DayAvailabilityGetter', () => {
  beforeEach(() => {
    appointments = new FakeAppointmentsRepository();
    service = new DayAvailabilityGetter(appointments);
  });

  it('should be able to list the day availability from provider', async () => {
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await appointments.create({
      provider_id: 'user id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await service.execute({
      provider_id: 'user id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 10, available: false},
      { hour: 11, available: false},
      { hour: 12, available: true},
      { hour: 13, available: false},
      { hour: 14, available: true},
    ]));
  });
});

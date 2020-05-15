import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ProviderAppointmentsGetter from "./ProviderAppointmentsGetter";
import Appointment from "../infra/typeorm/entities/Appointment";

let service: ProviderAppointmentsGetter;
let repository: FakeAppointmentsRepository;

describe('ProviderAppointmentsGetter', () => {
  beforeEach(() => {
    repository = new FakeAppointmentsRepository();
    service = new ProviderAppointmentsGetter(repository);
  });

  it('should be able to list the appointments at a specific day', async () => {
    const appointment1 = await repository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14)
    });
    const appointment2 = await repository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15)
    });

    const appointments = await service.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments.length).toBe(2);
    expect(appointments).toContainEqual(appointment1);
    expect(appointments).toContainEqual(appointment2);
  });
});

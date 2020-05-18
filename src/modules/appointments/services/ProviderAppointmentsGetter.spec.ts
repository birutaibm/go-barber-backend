import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ProviderAppointmentsGetter from "./ProviderAppointmentsGetter";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let service: ProviderAppointmentsGetter;
let repository: FakeAppointmentsRepository;
let cache: FakeCacheProvider;

describe('ProviderAppointmentsGetter', () => {
  beforeEach(() => {
    repository = new FakeAppointmentsRepository();
    cache = new FakeCacheProvider();
    service = new ProviderAppointmentsGetter(repository, cache);
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

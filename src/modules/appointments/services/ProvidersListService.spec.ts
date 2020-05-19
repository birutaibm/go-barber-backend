import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ProvidersListService from "./ProvidersListService";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let repository: FakeUserRepository;
let cache: FakeCacheProvider;
let shower: ProvidersListService;

describe('ProvidersListService', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    cache = new FakeCacheProvider();
    shower = new ProvidersListService(repository, cache);
  });

  it('should be able to show the providers', async () => {
    const user1 = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const user2 = await repository.create({
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123456',
    });
    const loggedUser = await repository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: '123456',
    });

    const providers = await shower.execute(loggedUser.id);
    expect(providers).toEqual([user1, user2]);
  });
});

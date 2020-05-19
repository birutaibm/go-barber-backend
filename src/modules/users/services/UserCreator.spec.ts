import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import UserCreator from "./UserCreator";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let repository: FakeUserRepository;
let creator: UserCreator;

describe('UserCreator', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    creator = new UserCreator(repository, new FakeHashProvider(), new FakeCacheProvider());
  });

  it('should be able to create a new user', async () => {
    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail from another', async () => {
    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});

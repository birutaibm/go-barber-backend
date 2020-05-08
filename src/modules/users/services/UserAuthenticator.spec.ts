import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UserCreator from "./UserCreator";
import UserAuthenticator from "./UserAuthenticator";
import AppError from "@shared/errors/AppError";

describe('UserAuthenticator', () => {
  it('should be able to authenticate with correct credentials', async () => {
    const repository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const creator = new UserCreator(repository, hashProvider);
    const authenticator = new UserAuthenticator(repository, hashProvider);

    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const result = await authenticator.execute({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    const repository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const authenticator = new UserAuthenticator(repository, hashProvider);

    expect(authenticator.execute({
      email: 'john@doe.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const repository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const creator = new UserCreator(repository, hashProvider);
    const authenticator = new UserAuthenticator(repository, hashProvider);

    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(authenticator.execute({
      email: 'john@doe.com',
      password: 'wrong password',
    })).rejects.toBeInstanceOf(AppError);
  });
});

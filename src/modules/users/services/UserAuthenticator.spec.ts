import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UserCreator from "./UserCreator";
import UserAuthenticator from "./UserAuthenticator";
import AppError from "@shared/errors/AppError";

let repository: FakeUserRepository;
let hashProvider: FakeHashProvider;
let authenticator: UserAuthenticator;

describe('UserAuthenticator', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    authenticator = new UserAuthenticator(repository, hashProvider);
  });

  it('should be able to authenticate with correct credentials', async () => {
    const user = await repository.create({
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
    expect(authenticator.execute({
      email: 'john@doe.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await repository.create({
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

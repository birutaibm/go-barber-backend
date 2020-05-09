import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import PasswordResetter from "./PasswordResetter";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let users: FakeUserRepository;
let tokens: FakeUserTokenRepository;
let hashProvider: FakeHashProvider;
let service: PasswordResetter;

describe('PasswordResetter', () => {
  beforeEach(() => {
    users = new FakeUserRepository();
    tokens = new FakeUserTokenRepository();
    hashProvider = new FakeHashProvider();
    service = new PasswordResetter(users, tokens, hashProvider);
  });

  it('should be able to reset the password', async () => {
    const user = await users.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const { token } = await tokens.generate(user.id);
    const hashSpier = jest.spyOn(hashProvider, 'generateHash');

    await service.execute({
      password: '1234321',
      token,
    });
    expect(hashSpier).toBeCalledWith('1234321');
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await tokens.generate('non-existing user');

    await expect(service.execute({
      password: '1234321',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(service.execute({
      password: '1234321',
      token: 'non-existing token',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after more than 2 hours', async () => {
    const user = await users.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const { token } = await tokens.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 2) + 1;
    });

    await expect(service.execute({
      password: '1234321',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });
});

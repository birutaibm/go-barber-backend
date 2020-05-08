import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import UserCreator from "./UserCreator";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe('UserCreator', () => {
  it('should be able to create a new user', async () => {
    const repository = new FakeUserRepository();
    const creator = new UserCreator(repository, new FakeHashProvider());

    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail from another', async () => {
    const repository = new FakeUserRepository();
    const creator = new UserCreator(repository, new FakeHashProvider());

    const user = await creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(creator.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});

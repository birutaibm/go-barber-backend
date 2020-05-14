import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import ProfileUpdater from "./ProfileUpdater";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let repository: FakeUserRepository;
let updater: ProfileUpdater;

describe('ProfileUpdater', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    updater = new ProfileUpdater(repository, new FakeHashProvider());
  });

  it('should be able to update the profile', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updatedUser = await updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('john@tre.com');
  });

  it('should be able to update the profile name', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updatedUser = await updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@doe.com',
    });

    expect(updatedUser.name).toBe('John Trê');
  });

  it('should not be able to update the profile of non-existing user', async () => {
    await expect(updater.execute({
      user_id: 'non-existing user.id',
      name: 'Nobody',
      email: 'nobody@any.sem'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user e-mail', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    await repository.create({
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123456',
    });

    await expect(updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updatedUser = await updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(updater.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      old_password: '1234321',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});

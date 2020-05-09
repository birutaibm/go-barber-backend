import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UserAvatarUpdater from "./UserAvatarUpdater";
import AppError from "@shared/errors/AppError";

let repository: FakeUserRepository;
let storageProvider: FakeStorageProvider;
let updater: UserAvatarUpdater;

describe('UserAvatarUpdater', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    storageProvider = new FakeStorageProvider();
    updater = new UserAvatarUpdater(repository, storageProvider);
  });

  it('should be able to upload a new user avatar', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updater.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to replace an existing user avatar', async () => {
    const deleteFileFunction = jest.spyOn(storageProvider, 'deleteFile');

    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    Object.assign( user, { avatar: 'oldAvatar.jpg' });

    await updater.execute({
      userId: user.id,
      avatarFilename: 'newAvatar.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('oldAvatar.jpg');
    expect(user.avatar).toBe('newAvatar.jpg');
  });

  it('should not be able to upload an avatar from non existing user', async () => {
    expect(updater.execute({
      userId: '123',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });
});

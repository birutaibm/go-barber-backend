import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import ProfileShower from "./ProfileShower";
import AppError from "@shared/errors/AppError";

let repository: FakeUserRepository;
let shower: ProfileShower;

describe('ProfileShower', () => {
  beforeEach(() => {
    repository = new FakeUserRepository();
    shower = new ProfileShower(repository);
  });

  it('should be able to show the profile', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const profile = await shower.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@doe.com');
  });

  it('should not be able to show the profile of non-existing user', async () => {
    await expect(shower.execute({
      user_id: 'non-existing user.id',
    })).rejects.toBeInstanceOf(AppError);
  });
});

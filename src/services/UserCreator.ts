import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface UserCreationDTO {
  name: string;
  email: string;
  password: string;
}

class UserCreator {
  public async execute({
    name,
    email,
    password,
  }: UserCreationDTO): Promise<User> {
    const repository = getRepository(User);
    const conflictingUser = await repository.findOne({
      where: { email },
    });

    if (conflictingUser) {
      throw Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    const user = repository.create({ name, email, password: hashedPassword });
    await repository.save(user);
    return user;
  }
}

export default UserCreator;

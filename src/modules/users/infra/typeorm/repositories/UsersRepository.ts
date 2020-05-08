import { getRepository } from 'typeorm';

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/IUserCreationDTO";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  constructor(private ormRepository = getRepository(User)) {}

  findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.save(user);
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
}

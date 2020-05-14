import { getRepository, Not } from 'typeorm';

import IUsersRepository, { FindAllProvidersInputDTO } from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/IUserCreationDTO";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  constructor(private ormRepository = getRepository(User)) {}

  findAllProviders({except_user_id}: FindAllProvidersInputDTO): Promise<User[]> {
    if (except_user_id)
      return this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    return this.ormRepository.find();
  }

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

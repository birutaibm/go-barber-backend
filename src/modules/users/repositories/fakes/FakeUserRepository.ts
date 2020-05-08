import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/IUserCreationDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import { uuid } from "uuidv4";

export default class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(candidate => candidate.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(candidate => candidate.email === email);
    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const index = this.users.findIndex(candidate => candidate.id === user.id);
    this.users[index] = user;
    return user;
  }
}

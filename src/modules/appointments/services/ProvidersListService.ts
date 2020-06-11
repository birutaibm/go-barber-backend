import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import { classToClass } from "class-transformer";

export default class ProvidersListService {
  constructor(
    private repository: IUsersRepository,
    private cache: ICacheProvider
  ) {}

  public async execute (user_id: string) {
    let users;
    users = await this.cache.recover<User[]>(`providers-list:${user_id}`);
    if (!users) {
      users = await this.repository.findAllProviders({
        except_user_id: user_id
      });

      await this.cache.save<User[]>(
        `providers-list:${user_id}`,
        classToClass(users)
      );
    }
    return users;
  }
}

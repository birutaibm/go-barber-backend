import { getRepository } from 'typeorm';

import IUserTokensRepository from "@modules/users/repositories/IUserTokenRepository";
import UserToken from "../entities/UserToken";

export default class UserTokensRepository implements IUserTokensRepository {
  constructor(private ormRepository = getRepository(UserToken)) {}

  findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: { token }
    });
  }

  public async generate(user_id: string) {
    const userToken = this.ormRepository.create({
      user_id
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

import IUserTokenRepository from "../IUserTokenRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { uuid } from "uuidv4";

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async generate(userId: string) {
    const token = new UserToken();
    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      user_id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.tokens.push(token);
    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.tokens.find(candidate => candidate.token === token);
  }
}

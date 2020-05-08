import { hash, compare } from 'bcryptjs';
import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string) {
    return await hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string) {
    return await compare(payload, hashed);
  }
}

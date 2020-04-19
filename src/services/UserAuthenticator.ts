import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';

interface UserAuthenticationDTO {
  email: string;
  password: string;
}

interface UserAuthenticatedDTO {
  user: User;
  token: string;
}

class UserAuthenticator {
  public async execute({
    email,
    password,
  }: UserAuthenticationDTO): Promise<UserAuthenticatedDTO> {
    const repository = getRepository(User);
    const user = await repository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Invalid e-mail/password');
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw Error('Invalid e-mail/password');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default UserAuthenticator;

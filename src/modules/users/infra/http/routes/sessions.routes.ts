import { Router } from 'express';

import UserAuthenticator from '@modules/users/services/UserAuthenticator';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticator = new UserAuthenticator(new UsersRepository(), new BCryptHashProvider());
  const { user, token } = await authenticator.execute({ email, password });

  delete user.password;
  return response.status(201).json({ user, token });
});

export default router;

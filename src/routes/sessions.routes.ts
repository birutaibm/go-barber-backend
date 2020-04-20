import { Router } from 'express';

import UserAuthenticator from '../services/UserAuthenticator';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticator = new UserAuthenticator();
  const { user, token } = await authenticator.execute({ email, password });

  delete user.password;
  return response.status(201).json({ user, token });
});

export default router;

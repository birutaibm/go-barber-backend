import { Router } from 'express';

import UserCreator from '../services/UserCreator';

const router = Router();

router.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const creator = new UserCreator();
    const user = await creator.execute({ name, email, password });

    delete user.password;
    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default router;

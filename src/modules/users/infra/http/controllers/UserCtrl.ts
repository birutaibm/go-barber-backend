import { Request, Response } from 'express';
import container from '@modules/users/providers';
import UserCreator from '@modules/users/services/UserCreator';

export default class UserCtrl {
  public static async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const creator = new UserCreator(
        container.get('UsersRepository'),
        container.get('HashProvider')
      );
      const user = await creator.execute({ name, email, password });

      delete user.password;
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

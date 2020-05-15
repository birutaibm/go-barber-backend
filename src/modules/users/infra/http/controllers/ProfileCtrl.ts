import { Request, Response } from 'express';
import container from '@shared/container';
import ProfileUpdater from '@modules/users/services/ProfileUpdater';
import ProfileShower from '@modules/users/services/ProfileShower';

export default class ProfileCtrl {
  private updater: ProfileUpdater;
  private shower: ProfileShower;

  private getUpdaterService() {
    if (!this.updater) {
      const users = container.get('UsersRepository');
      const hash =  container.get('HashProvider');
      this.updater = new ProfileUpdater(users, hash);
    }
    return this.updater
  }

  private getShowerService() {
    if (!this.shower) {
      const users = container.get('UsersRepository');
      this.shower = new ProfileShower(users);
    }
    return this.shower
  }

  public async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const user = await this.getShowerService().execute({user_id});

    return response.json(user);
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password,
    } = request.body;
    const user = await this.getUpdaterService().execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    delete user.password;

    return response.status(200).json(user);
  }
}

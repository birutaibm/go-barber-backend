import { Request, Response } from 'express';
import ForgotPasswordEmailSender from '@modules/users/services/ForgotPasswordEmailSender';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../../typeorm/repositories/UserTokensRepository';
import container from '@shared/container';

export default class ForgotPasswordCtrl {
  private service: ForgotPasswordEmailSender;

  async send(email: string) {
    if (!this.service) {
      const users = new UsersRepository();
      const tokens = new UserTokensRepository();
      const mailSender = container.get('MailSender');
      this.service = new ForgotPasswordEmailSender(users, tokens, mailSender);
    }
    return this.service.execute(email);
  }

  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const message = await this.send(email);

    return response.status(201).json(message);
  }
}

import { Request, Response } from 'express';
import ForgotPasswordEmailSender from '@modules/users/services/ForgotPasswordEmailSender';
import container from '@shared/container';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IMailSender from '@shared/container/providers/MailSender/models/IMailSender';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class ForgotPasswordCtrl {
  constructor() {
    const creator =
      (u: IUsersRepository, t: IUserTokenRepository, m: IMailSender) =>
        new ForgotPasswordEmailSender(u, t, m);
    container.inject<ForgotPasswordEmailSender>(
      'ForgotPasswordEmailSender',
      {
        creator,
        dependencies: ['UsersRepository', 'UserTokensRepository', 'MailSender']
      }
    );
  }

  public async create(request: Request, response: Response) {
    const service = container.resolve<ForgotPasswordEmailSender>('ForgotPasswordEmailSender');

    const { email } = request.body;
    const message = await service.execute(email);

    return response.status(201).json(message);
  }
}

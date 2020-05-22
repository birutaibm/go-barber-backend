import path from 'path';

import IUsersRepository from "../repositories/IUsersRepository";
import IMailSender from "@shared/container/providers/MailSender/models/IMailSender";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

export default class ForgotPasswordEmailSender {
  constructor(
    private users: IUsersRepository,
    private tokens: IUserTokenRepository,
    private mailSender: IMailSender,
  ) {}

  public async execute(email: string): Promise<any> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await this.tokens.generate(user.id);
    const message = await this.mailSender.sendMail({
      to: user,
      subject: '[GoBarber] Recuperação de senha',
      body: {
        structure: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
        variables: {
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
          name: user.name,
        },
      },
    });

    if (message) {
      return message;
    } else {
      throw new AppError('Fail to send mail', 500);
    }
  }
}

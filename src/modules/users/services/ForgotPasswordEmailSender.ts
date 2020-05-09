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

  public async execute(email: string): Promise<void> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await this.tokens.generate(user.id);
    this.mailSender.sendMail({
      to: email,
      body: JSON.stringify(token),
    });
  }
}

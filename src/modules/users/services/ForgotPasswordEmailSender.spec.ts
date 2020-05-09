import ForgotPasswordEmailSender from "./ForgotPasswordEmailSender";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeMailSender from "@shared/container/providers/MailSender/fakes/FakeMailSender";
import AppError from "@shared/errors/AppError";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";

let users: FakeUserRepository;
let tokens: FakeUserTokenRepository;
let sender: FakeMailSender;
let service: ForgotPasswordEmailSender;

describe('ForgotPasswordEmailSender', () => {
  beforeEach(() => {
    users = new FakeUserRepository();
    tokens = new FakeUserTokenRepository();
    sender = new FakeMailSender();
    service = new ForgotPasswordEmailSender(users, tokens, sender);
  });

  it('should be able to send password recover e-mail', async () => {
    const senderSpier = jest.spyOn(sender, 'sendMail');
    users.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await service.execute('john@doe.com');
    expect(senderSpier).toHaveBeenCalledTimes(1);
  });

  it('should not be able to send password recover e-mail to a non-existing user', async () => {
    const senderSpier = jest.spyOn(sender, 'sendMail');

    await expect(service.execute('john@doe.com')).rejects.toBeInstanceOf(AppError);
    expect(senderSpier).not.toHaveBeenCalled();
  });

  it('should generate a forgot password token', async () => {
    const user = await users.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const tokensSpier = jest.spyOn(tokens, 'generate');

    await service.execute('john@doe.com');
    expect(tokensSpier).toHaveBeenCalledWith(user.id);
  });
});

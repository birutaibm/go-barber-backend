import nodemailer, { Transporter } from 'nodemailer';
import IMailSender, { IMessage } from "../models/IMailSender";
import IMailTemplate from '../../MailTemplate/models/IMailTemplate';

export default class EtherealMailSender implements IMailSender {
  private client: Transporter;

  constructor(
    private mailTemplate: IMailTemplate
  ) {}

  private async getClient() {
    if (!this.client) {
      const account = await nodemailer.createTestAccount();
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    }
    return this.client;
  }

  public async sendMail({ to, body, subject, from }: IMessage) {
    const client = await this.getClient();
    const libTo = to.name ? {name: to.name, address: to.email} : to.email;
    let libFrom;
    if (from) {
      libFrom = from.name ? {name: from.name, address: from.email} : from.email;
    } else {
      libFrom = 'Equipe GoBarber <equipe@gobarber.com.br>';
    }
    const message = await client.sendMail({
      from: libFrom,
      to: libTo,
      subject,
      html: await this.mailTemplate.parse(body),
    });
    return {...message, url: nodemailer.getTestMessageUrl(message)};
  }
}

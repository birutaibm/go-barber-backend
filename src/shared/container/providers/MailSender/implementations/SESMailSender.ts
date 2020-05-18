import nodemailer, { Transporter } from 'nodemailer';
import IMailSender, { IMessage } from "../models/IMailSender";
import IMailTemplate from '../../MailTemplate/models/IMailTemplate';

export default class SESMailSender implements IMailSender {
  constructor(
    private mailTemplate: IMailTemplate
  ) {}

  public async sendMail({ to, body, subject, from }: IMessage) {
    console.log('Funcionou!!');
  }
}

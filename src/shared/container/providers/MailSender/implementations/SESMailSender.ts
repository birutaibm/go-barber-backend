import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import IMailSender, { IMessage } from "../models/IMailSender";
import IMailTemplate from '../../MailTemplate/models/IMailTemplate';

/* TODO Para que isto funcione você precisa ter conta na AWS para uso do SES:
 *  - Registre um dominio (utilizando o google domain por exemplo)
 *  - Crie um e-mail para esse dominio (utilizando o zoho por exemplo)
 *  - Configure seu e-mail no AWS SES
 *  - Troque no @config/mail o campo defaults.from.email
 *  - Gere as credenciais da AWS pelo IAM AWS e copie as informações no .env
 */

export default class SESMailSender implements IMailSender {
  private client: Transporter;

  constructor(
    private mailTemplate: IMailTemplate
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        //TODO verificar se é essa mesmo: region: 'us-east-1',
      }),
    });
  }

  public async sendMail({ to, body, subject, from }: IMessage) {
    const libTo = to.name ? {name: to.name, address: to.email} : to.email;
    let libFrom;
    if (from) {
      libFrom = from.name ? {name: from.name, address: from.email} : from.email;
    } else {
      libFrom = mailConfig.defaults.from;
    }
    const message = await this.client.sendMail({
      from: libFrom,
      to: libTo,
      subject,
      html: await this.mailTemplate.parse(body),
    });
    return message;
  }
}

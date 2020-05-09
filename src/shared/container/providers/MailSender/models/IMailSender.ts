import { IMailTemplateInput } from "../../MailTemplate/models/IMailTemplate";

export interface IContact {
  name?: string;
  email: string;
}

export interface IMessage {
  to: IContact;
  from?: IContact;
  subject: string;
  body: IMailTemplateInput;
};

export default interface IMailSender {
  sendMail(message: IMessage): Promise<any>;
};

import IMailSender, { IMessage } from "../models/IMailSender";

export default class FakeMailSender implements IMailSender {
  private messages: IMessage[] = [];

  public async sendMail(message: IMessage): Promise<IMessage> {
    this.messages.push(message);
    return message;
  }
};

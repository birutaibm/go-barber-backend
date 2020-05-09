import IMailSender, { IMessage } from "../models/IMailSender";

export default class FakeMailSender implements IMailSender {
  private messages: IMessage[] = [];

  public async sendMail(message: IMessage): Promise<void> {
    this.messages.push(message);
  }
};

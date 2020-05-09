export interface IMessage {
  to: string;
  body: string;
};

export default interface IMailSender {
  sendMail(message: IMessage): Promise<void>;
};

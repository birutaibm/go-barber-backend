export default class AppError {
  public readonly messge: string;

  public readonly statusCode: number;

  constructor(messge: string, statusCode = 400) {
    this.messge = messge;
    this.statusCode = statusCode;
  }
}

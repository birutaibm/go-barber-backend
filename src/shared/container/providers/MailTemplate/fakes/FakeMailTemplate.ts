import IMailTemplate, { IMailTemplateInput } from "../models/IMailTemplate";

export default class FakeMailTemplate implements IMailTemplate {
  public async parse({ structure }: IMailTemplateInput) {
    return structure;
  }
}

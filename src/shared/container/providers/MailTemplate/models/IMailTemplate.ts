export interface IMailTemplateInput {
  structure: string;
  variables: {[key: string]: string | number};
}

export default interface IMailTemplate {
  parse(data: IMailTemplateInput): Promise<string>;
}

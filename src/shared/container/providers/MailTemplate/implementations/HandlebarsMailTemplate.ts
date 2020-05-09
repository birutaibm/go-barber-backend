import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplate, { IMailTemplateInput } from "../models/IMailTemplate";

export default class HandlebarsMailTemplate implements IMailTemplate {
  public async parse({ structure, variables }: IMailTemplateInput) {
    const template = await fs.promises.readFile(structure, {encoding: 'utf-8'});
    const libParse = handlebars.compile(template);
    return libParse(variables);
  }
}

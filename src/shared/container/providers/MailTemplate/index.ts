import container from '../../Container';

import HandlebarsMailTemplate from './implementations/HandlebarsMailTemplate';
import IMailTemplate from './models/IMailTemplate';

container.registry<IMailTemplate>('MailTemplate', () => new HandlebarsMailTemplate());

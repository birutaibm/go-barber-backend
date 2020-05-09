import container from './providers';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';
import IMailSender from './providers/MailSender/models/IMailSender';
import EtherealMailSender from './providers/MailSender/implementations/EtherealMailSender';
import HandlebarsMailTemplate from './providers/MailTemplate/implementations/HandlebarsMailTemplate';
import IMailTemplate from './providers/MailTemplate/models/IMailTemplate';

container.registry<IStorageProvider>('DiskStorage', () => new DiskStorageProvider());
container.registry<IMailTemplate>('MailTemplate', () => new HandlebarsMailTemplate());
container.registry<IMailSender>('MailSender', () => new EtherealMailSender(container.get('MailTemplate')));

export default container;

import container from './providers';

import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';
import IMailSender from './providers/MailSender/models/IMailSender';
import EtherealMailSender from './providers/MailSender/implementations/EtherealMailSender';
import HandlebarsMailTemplate from './providers/MailTemplate/implementations/HandlebarsMailTemplate';
import IMailTemplate from './providers/MailTemplate/models/IMailTemplate';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/Appointments';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import './providers/CacheProvider';

container.registry<IStorageProvider>('DiskStorage', () => new DiskStorageProvider());
container.registry<IMailTemplate>('MailTemplate', () => new HandlebarsMailTemplate());
container.registry<IMailSender>('MailSender', () => new EtherealMailSender(container.get('MailTemplate')));

container.registry<IAppointmentsRepository>('AppointmentsRepository', () => new AppointmentsRepository());

container.registry<IHashProvider>('HashProvider', () => new BCryptHashProvider());
container.registry<IUsersRepository>('UsersRepository', () => new UsersRepository());
container.registry<IUserTokenRepository>('UserTokensRepository', () => new UserTokensRepository());

container.registry<INotificationsRepository>('NotificationsRepository', () => new NotificationsRepository());

export default container;

import container from '@shared/container';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';

container.registry<IHashProvider>('HashProvider', () => new BCryptHashProvider());
container.registry<IUsersRepository>('UsersRepository', () => new UsersRepository());
container.registry<IUserTokenRepository>('UserTokensRepository', () => new UserTokensRepository());

export default container;

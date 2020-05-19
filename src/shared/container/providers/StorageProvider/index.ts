import container from '../../Container';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

container.registry<IStorageProvider>('DiskStorage', () => new DiskStorageProvider());

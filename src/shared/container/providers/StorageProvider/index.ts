import container from '../../Container';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const creators = {
  disk: () => new DiskStorageProvider(),
  s3: () => new S3StorageProvider(),
};

container.registry<IStorageProvider>(
  'StorageProvider',
  creators[uploadConfig.driver]
);

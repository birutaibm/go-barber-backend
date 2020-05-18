import container from '..';

import ICacheProvider from './models/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: () => new RedisCacheProvider(),
};

container.registry<ICacheProvider>('CacheProvider', providers.redis);

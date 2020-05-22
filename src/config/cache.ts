import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

// TODO mover valores das configurações do redis para o .env (aula Express rate limit)

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

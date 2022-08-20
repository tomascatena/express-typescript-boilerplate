import {
  cleanEnv,
  port,
  str,
  url,
} from 'envalid';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * @config
 * @description - Returns a sanitized, immutable environment object.
 */
export const env = cleanEnv(process.env, {
  APP_NAME: str(),
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    desc: 'Node environment',
  }),
  PORT: port({ desc: 'API Port' }),
  MONGODB_URI: url({ desc: 'Mongo DB url' }),
  MONGODB_TEST_URI: url({ desc: 'Mongo DB url for Test Database' }),
  JWT_SECRET: str({ desc: 'JWT Secret' }),
});

import { Logger, LoggerToFile } from '@/config/logger';
import { exitHandler } from './exitHandler';
import { server } from '@/http-server';

/**
 * SIGTERM handler. It will close the server and exit the process.
 */
export const SIGTERMHandler = () => {
  Logger.info('SIGTERM received');

  LoggerToFile.info('SIGTERM received');

  exitHandler(server);
};

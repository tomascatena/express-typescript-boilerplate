import { Logger } from '@/config/logger';
import { Server } from 'http';

/**
 * Exit handler
 * @param server - The server to be closed
 */
export const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
    });
  }

  process.exit(1);
};

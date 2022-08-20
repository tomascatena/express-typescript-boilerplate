import {
  DailyRotateFileForErrors,
  DailyRotateFileForInfo,
  formatToFile,
} from '@/config/logger';
import expressWinston from 'express-winston';

/**
 * @middleware
 * @description - Custom winston logger middleware.
 */
export const expressWinstonLogger = {
  info: expressWinston.logger({
    format: formatToFile,
    transports: [DailyRotateFileForInfo],
  }),
  error: expressWinston.logger({
    format: formatToFile,
    transports: [DailyRotateFileForErrors],
  }),
};

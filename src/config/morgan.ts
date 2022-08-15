import { Logger } from './logger';
import { Response } from 'express';
import morgan from 'morgan';

class LoggerStream {
  static write(text: string) {
    Logger.http(text.replace(/\n$/, ''));
  }
}

/**
 * Returns the color to be used for the morgan logger based on that status code of the response.
 * @param statusCode - Status code of the response
 * @returns Color to be used for morgan logger
 */
const getStatusColor = (statusCode: number) => {
  let color = 0; // no color

  if (statusCode >= 500) {
    color = 31; // red
  } else if (statusCode >= 400) {
    color = 33; // yellow
  } else if (statusCode >= 300) {
    color = 36; // cyan
  } else if (statusCode >= 200) {
    color = 32; // green
  }

  return color;
};

morgan.token('statusColor', (req, res: Response) => {
  const status = res.headersSent ? res.statusCode : 200;

  return `\x1b[${getStatusColor(status)}m${status}\x1b[0m`;
});

/**
 * @middleware
 * Morgan logger middleware.
 */
export const morganHttpLogger = morgan(
  '\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]',
  { stream: LoggerStream },
);

import 'colors';
import 'winston-daily-rotate-file';
import { env } from './env';
import process from 'process';
import winston from 'winston';

const CUSTOM_LEVELS = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'italic yellow',
    info: 'bold blue',
    http: 'blue',
    debug: 'white',
  },
};

winston.addColors(CUSTOM_LEVELS.colors);

export const formatToFile = winston.format.combine(
  winston.format.uncolorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json(),
);

const formatToConsole = winston.format.combine(
  winston.format.colorize({ all: false }),
  winston.format.prettyPrint(),
  winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
  winston.format.label({ label: `[${env.APP_NAME}] ${process.pid}  -` }),
  winston.format.printf(
    (info) => `${info.label.green} ${info.timestamp.yellow}  ${info.level} : ${info.message.green}`,
  ),
);

export const DailyRotateFileForErrors = new winston.transports.DailyRotateFile({
  filename: 'logs/error/error-%DATE%.log',
  level: 'error',
});

export const DailyRotateFileForInfo = new winston.transports.DailyRotateFile({
  filename: 'logs/activity/activity-%DATE%.log',
  level: 'info',
});

/**
 * @config
 * @description - Custom winston logger to be used when writing to the console.
 */
export const Logger = winston.createLogger({
  exitOnError: false,
  levels: CUSTOM_LEVELS.levels,
  level: 'debug',
  format: formatToConsole,
  transports: [new winston.transports.Console()],
  silent: env.NODE_ENV === 'test',
});

/**
 * @config
 * @description - Custom winston logger to be used when writing to the file.
 */
export const LoggerToFile = winston.createLogger({
  exitOnError: false,
  levels: CUSTOM_LEVELS.levels,
  format: formatToFile,
  transports: [DailyRotateFileForErrors],
  silent: env.NODE_ENV === 'test',
});

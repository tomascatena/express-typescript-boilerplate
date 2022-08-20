import { authLimiter } from '@/middleware/authLimiter';
import { env } from '@/config/env';
import { errorHandler } from '@/middleware/errorHandler';
import { expressWinstonLogger } from '@/middleware/expressWinstonLogger';
import { morganHttpLogger } from '@/config/morgan';
import { notFound } from '@/middleware/notFound';
import { rateLimiter } from '@/middleware/rateLimiter';
import { transformErrorToAPIError } from '@/middleware/transformErrorToAPIError';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import routes from '@/routes/v1';
import xssClean from 'xss-clean';

/**
 * Express application.
 */
export const app = express();

/**
 * Set up middlewares
 */

// Secure Express app by setting various HTTP headers
app.use(helmet());

// Prevent cross site scripting attacks
app.use(xssClean());

// Sanitize request data
app.use(mongoSanitize());

// Basic rate-limiting middleware
if (env.NODE_ENV === 'production' || env.NODE_ENV === 'test') {
  app.use(rateLimiter);
}

if (env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morganHttpLogger);
}

// Parse json request body
app.use(express.json({ limit: '1kb' }));

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);

// Express-winston logger makes sense BEFORE the router
app.use(expressWinstonLogger.info);

// Limit repeated failed requests to auth endpoints
if (env.NODE_ENV === 'production' || env.NODE_ENV === 'test') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// Express-winston errorLogger makes sense AFTER the router
app.use(expressWinstonLogger.error);

// Fallback for not found requests
app.use(notFound);

// Convert error to instance of ApiError, if needed
app.use(transformErrorToAPIError);

// Error handler for failed requests
app.use(errorHandler);

import { rateLimit } from 'express-rate-limit';

/**
 * @middleware
 * @description - This is a middleware that is used to limit the number of requests to all the routes.
 */
export const rateLimiter = rateLimit({
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  windowMs: 10 * 60 * 1000, // 10 Minutes
});

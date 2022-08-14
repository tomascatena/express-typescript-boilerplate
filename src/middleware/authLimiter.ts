import rateLimit from 'express-rate-limit';

/**
 * @middleware
 * @description - This is a middleware that is used to limit the number of requests to the auth routes.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
});

/**
 * @class ApiError
 * @desc Custom error class to return error responses
 * @param {string} message - The message of the error
 * @param {number} statusCode - The status code of the error
 * @param {boolean} isOperational - Whether the error is operational or not. Default is true. Defaults to true.
 * @param {string} stack - The stack of the error. Default is empty string. Defaults to empty string.
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  stack: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack = '',
  ) {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.stack = stack;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

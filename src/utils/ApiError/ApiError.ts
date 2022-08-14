interface ApiErrorConstructor {
  statusCode: number;
  message: string;
  isOperational?: boolean;
  stack?: string;
}

/**
 * @class ApiError
 * @desc Custom error class to return error responses
 * @param statusCode - The status code of the error
 * @param message - The message of the error
 * @param isOperational - Whether the error is operational or not. Default is true.
 * @param stack - The stack of the error. Default is empty string.
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor({
    isOperational = true,
    message,
    stack = '',
    statusCode,
  }: ApiErrorConstructor) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

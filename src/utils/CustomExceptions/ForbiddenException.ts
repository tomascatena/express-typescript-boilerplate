import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class ForbiddenException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class ForbiddenException extends ApiError {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(message, httpStatusCodes.FORBIDDEN, false);

    this.name = 'ForbiddenException';
  }
}

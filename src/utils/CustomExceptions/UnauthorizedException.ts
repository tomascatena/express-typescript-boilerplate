import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class UnauthorizedException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class UnauthorizedException extends ApiError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message, httpStatusCodes.UNAUTHORIZED, false);

    this.name = 'UnauthorizedException';
  }
}

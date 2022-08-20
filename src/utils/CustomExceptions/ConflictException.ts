import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class ConflictException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class ConflictException extends ApiError {
  constructor(message: string = ReasonPhrases.CONFLICT) {
    super(message, httpStatusCodes.CONFLICT, false);

    this.name = 'ConflictException';
  }
}

import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class BadRequestException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class BadRequestException extends ApiError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, httpStatusCodes.BAD_REQUEST, false);

    this.name = 'BadRequestException';
  }
}

import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class NotFoundException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class NotFoundException extends ApiError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, httpStatusCodes.NOT_FOUND, false);

    this.name = 'NotFoundException';
  }
}

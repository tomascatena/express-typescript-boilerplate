import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class AcceptedException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class AcceptedException extends ApiError {
  constructor(message: string = ReasonPhrases.ACCEPTED) {
    super(message, httpStatusCodes.ACCEPTED, false);

    this.name = 'AcceptedException';
  }
}

import { ApiError } from '../ApiError/ApiError';
import httpStatusCodes, { ReasonPhrases } from 'http-status-codes';

/**
 * @class InternalServerErrorException
 * @extends {ApiError}
 * @param {string} message - Error message
 */
export class InternalServerErrorException extends ApiError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message, httpStatusCodes.INTERNAL_SERVER_ERROR, false);

    this.name = 'InternalServerErrorException';
  }
}

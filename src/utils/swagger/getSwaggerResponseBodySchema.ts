import { iterateOverValues } from './iterateOverValues';
import omit from 'lodash/omit';

export type GeneralObject = { [key: string]: any };

type GetSwaggerResponseBodySchemaParams = {
  responseBody: GeneralObject;
  description?: string;
};

/**
 * @desc Get swagger schema for response body from response body example (Only valid for JSON responses!)
 * @param responseBody - Example response body
 * @returns Swagger response body schema
 */
export const getSwaggerResponseBodySchema = ({
  description,
  responseBody,
}: GetSwaggerResponseBodySchemaParams) => {
  const responseBodySwaggerSchema = {};

  return {
    ...(description && { description }),
    content: {
      'application/json': {
        schema: {
          type: 'object',
          ...iterateOverValues(
            omit(responseBody, ['stack']), // Stack is only for debugging purposes
            responseBodySwaggerSchema,
          ),
        },
      },
    },
  };
};

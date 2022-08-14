import { iterateOverValues } from './iterateOverValues';

type GeneralObject = { [key: string]: any };

type GetSwaggerRequestBodySchemaParams = {
  isRequired?: boolean;
  requestBody: GeneralObject;
  requiredFields?: string[];
};

/**
 * @desc Get swagger schema for request body from request body example (Only valid for JSON bodies!)
 * @param requestBody - Example request body
 * @param requiredFields - Array of required fields (optional)
 * @param isRequired - Whether the request body is required (optional)
 * @returns Swagger request body schema
 */
export const getSwaggerRequestBodySchema = ({
  isRequired = false,
  requestBody,
  requiredFields,
}: GetSwaggerRequestBodySchemaParams) => {
  const requestBodySwaggerSchema = {};

  return {
    required: isRequired,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: requiredFields || [],
          ...iterateOverValues(requestBody, requestBodySwaggerSchema),
        },
      },
    },
  };
};

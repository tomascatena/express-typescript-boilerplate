import { StatusCodes } from 'http-status-codes';
import { getSwaggerRequestBodySchema } from '@/utils/swagger/getSwaggerRequestBodySchema';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const getUserByIdRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: [],
  requestBody: {},
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Get user by user ID',
  responseBody: {
    status: 200,
    message: 'User retrieved successfully',
    user: {
      username: 'Tomas',
      email: 'tomas@email.com',
      role: 'USER_ROLE',
      uid: '62fa7a8c4be508bf39314c9c',
    },
  },
});

export const getUserById = {
  get: {
    tags: ['Users'],
    summary: 'Get user by user ID',
    description: 'Get user by user ID',
    produces: ['application/json'],
    requestBody: getUserByIdRequestBody,
    responses: {
      [StatusCodes.OK]: successResponse,
    },
  },
};

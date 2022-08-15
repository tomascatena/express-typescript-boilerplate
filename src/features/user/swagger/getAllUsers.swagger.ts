import { StatusCodes } from 'http-status-codes';
import { getSwaggerRequestBodySchema } from '@/utils/swagger/getSwaggerRequestBodySchema';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const getAllUsersRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: [],
  requestBody: {},
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Get all users paginated and filtered',
  responseBody: {
    status: 200,
    message: 'Users retrieved successfully',
    totalUsers: 1,
    users: [
      {
        username: 'Tomas',
        email: 'tomas@email.com',
        role: 'USER_ROLE',
        uid: '62fa7a8c4be508bf39314c9c',
      },
    ],
  },
});

export const getAllUsers = {
  get: {
    tags: ['Users'],
    summary: 'Get all users paginated and filtered',
    description: 'Get all users paginated and filtered, with query params: limit, from',
    requestBody: getAllUsersRequestBody,
    responses: {
      [StatusCodes.OK]: successResponse,
    },
  },
};

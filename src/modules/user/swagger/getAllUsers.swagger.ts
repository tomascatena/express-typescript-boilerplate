import { StatusCodes } from 'http-status-codes';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const queryParameters = [
  {
    in: 'query',
    name: 'limit',
    description: 'Amount of users to return',
    required: false,
    schema: {
      type: 'integer',
      minimum: 0,
      default: 5,
    },
  },
  {
    in: 'query',
    name: 'from',
    description: 'Amount of users to skip from the beginning',
    required: false,
    schema: {
      type: 'integer',
      minimum: 0,
      default: 0,
    },
  },
];

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
    produces: ['application/json'],
    parameters: queryParameters,
    responses: {
      [StatusCodes.OK]: successResponse,
    },
  },
};

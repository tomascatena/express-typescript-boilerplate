import { StatusCodes } from 'http-status-codes';
import { getSwaggerRequestBodySchema } from '@/utils/swagger/getSwaggerRequestBodySchema';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const updateUserRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: [],
  requestBody: {
    username: 'Tomas',
    email: 'tomas@email.com',
    password: 'abc123',
    profileImage: 'url to image',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Successfully deleted user',
  responseBody: {
    message: 'User updated successfully',
    user: {
      username: 'Tomas',
      email: 'tomas@email.com',
      role: 'USER_ROLE',
      uid: '62fa9b8eedad7f0bdb45a349',
    },
  },
});

const nothingUpdated = getSwaggerResponseBodySchema({
  description: 'Nothing updated',
  responseBody: {
    status: 202,
    message: 'No fields to update',
  },
});

const userNotFound = getSwaggerResponseBodySchema({
  description: 'User to delete not found',
  responseBody: {
    status: 404,
    message: 'User not found',
  },
});

const unauthorized = getSwaggerResponseBodySchema({
  description: 'Not authorized to access the resource',
  responseBody: {
    statusCode: 401,
    message: 'Not authorized to access this endpoint',
  },
});

const pathParameters = [
  {
    in: 'path',
    name: 'userId',
    description: 'User ID',
    required: true,
    schema: {
      type: 'string',
    },
  },
];

export const updateUser = {
  put: {
    tags: ['Users'],
    summary: 'Update user',
    description: 'Update a by user id',
    produces: ['application/json'],
    requestBody: updateUserRequestBody,
    parameters: pathParameters,
    security: [{ bearerAuth: [] }],
    responses: {
      [StatusCodes.OK]: successResponse,
      [StatusCodes.ACCEPTED]: nothingUpdated,
      [StatusCodes.UNAUTHORIZED]: unauthorized,
      [StatusCodes.NOT_FOUND]: userNotFound,
    },
  },
};

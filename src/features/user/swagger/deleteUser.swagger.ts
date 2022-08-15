import { StatusCodes } from 'http-status-codes';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const successResponse = getSwaggerResponseBodySchema({
  description: 'Successfully deleted user',
  responseBody: {
    status: 202,
    message: 'User deleted successfully',
    removedUser: {
      username: 'Tomas',
      email: 'tomas@email.com',
      role: 'USER_ROLE',
      uid: '62fa93139520e311cbbb4acc',
    },
  },
});

const validationErrorResponse = getSwaggerResponseBodySchema({
  description: 'Validation error on parameters',
  responseBody: {
    message: 'Invalid information',
    errors: {
      userId: {
        value: '62fa9045a9ad15d646be8ea',
        msg: 'User ID is invalid',
        param: 'userId',
        location: 'params',
      },
    },
  },
});

const userNotFound = getSwaggerResponseBodySchema({
  description: 'User to delete not found',
  responseBody: {
    status: 404,
    message: 'User not found',
  },
});

const forbidden = getSwaggerResponseBodySchema({
  description: 'Not allowed to delete other user when not admin',
  responseBody: {
    statusCode: 403,
    message: 'You are not allowed to delete this user',
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

export const deleteUser = {
  delete: {
    tags: ['Users'],
    summary: 'Delete user',
    description: 'Delete a by user id',
    parameters: pathParameters,
    responses: {
      [StatusCodes.ACCEPTED]: successResponse,
      [StatusCodes.BAD_REQUEST]: validationErrorResponse,
      [StatusCodes.FORBIDDEN]: forbidden,
      [StatusCodes.NOT_FOUND]: userNotFound,
    },
  },
};

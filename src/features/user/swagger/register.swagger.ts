import { StatusCodes } from 'http-status-codes';
import { getSwaggerRequestBodySchema } from '@/utils/swagger/getSwaggerRequestBodySchema';
import { getSwaggerResponseBodySchema } from '@/utils/swagger/getSwaggerResponseBodySchema';

const registerUserRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: ['username', 'email', 'password', 'confirmPassword'],
  requestBody: {
    username: 'Tomas',
    email: 'tomas@email.com',
    password: 'abc123',
    confirmPassword: 'abc123',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Login existing user',
  responseBody: {
    status: 201,
    message: 'User created successfully',
    user: {
      username: 'Tomas',
      email: 'tomas@email.com',
      role: 'USER_ROLE',
      isEmailVerified: false,
      uid: '62fa405764fc84fb2b4cd5a9',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmYTQwNTc2NGZjODRmYjJiNGNkNWE5IiwiaWF0IjoxNjYwNTY3NjM5LCJleHAiOjE2NjExNzI0Mzl9.Um8xkjVPpxsy83B1bqMG1MQNgZJVNKZB1jhSKTRuhHM',
  },
});

const validationErrorResponse = getSwaggerResponseBodySchema({
  description: 'Validation error on email or password',
  responseBody: {
    validatorErrors: [
      {
        message: '"email" must be a valid email',
        path: ['email'],
        type: 'string.email',
        context: {
          invalids: ['usernamegmail.com'],
          label: 'email',
          key: 'email',
        },
      },
    ],
  },
});

const emailTakenResponse = getSwaggerResponseBodySchema({
  description: 'Validation error on email or password',
  responseBody: {
    status: 409,
    message: 'Email is already taken',
  },
});

export const register = {
  post: {
    tags: ['Users'],
    summary: 'Register user',
    description: 'Register a new user',
    consumes: ['application/json'],
    produces: ['application/json'],
    requestBody: registerUserRequestBody,
    responses: {
      [StatusCodes.OK]: successResponse,
      [StatusCodes.BAD_REQUEST]: validationErrorResponse,
      [StatusCodes.CONFLICT]: emailTakenResponse,
    },
  },
};

import { Server } from 'http';
import { UserRole } from '../../config/roles';
import User from './User.model';
import mongoose from 'mongoose';
import request from 'supertest';

let server: Server;

describe('Users routes', () => {
  beforeEach(async () => {
    // eslint-disable-next-line
    server = require('@/http-server').server;
    await User.collection.deleteMany({});
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });

  describe('api/v1/users', () => {
    it('return the list of users in the response', async () => {
      await User.collection.insertMany([
        {
          username: 'John Doe',
          email: 'john.doe@email.com',
          password: 'password',
          role: UserRole.USER,
          isActive: true,
        },
        {
          username: 'Jane Doe',
          email: 'jane.doe@email.com',
          password: 'password',
          role: UserRole.USER,
          isActive: true,
        },
      ]);

      const res = await request(server).get('/api/v1/users');

      expect(res.status).toBe(200);
      expect(res.body.users.length).toBe(2);
    });
  });

  describe('api/v1/users/:userId', () => {
    it('should return a user if a valid userId is passed', async () => {
      const user = await User.create({
        username: 'John Doe',
        email: 'john.doe@email.com',
        password: 'password',
        role: UserRole.USER,
      });

      const uid = user._id.toString();

      const res = await request(server).get(`/api/v1/users/${uid}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toEqual({
        username: 'John Doe',
        email: 'john.doe@email.com',
        role: UserRole.USER,
        uid,
      });
    });

    it('should return 404 if invalid userId is passed', async () => {
      const uid = '62ffc80b7284e7effeca6745';

      const res = await request(server).get(`/api/v1/users/${uid}`);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'User not found',
      });
    });
  });
});

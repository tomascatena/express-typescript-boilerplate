import { env } from '@/config/config';

const {
  version,
  name,
  description,
  author,
} = require('../../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: name,
    version,
    description,
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: author,
      url: 'https://www.github.com/',
    },
  },
  host: `localhost:${env.PORT}`,
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: `http://localhost:${env.PORT}/api/v1`,
    },
  ],
};

export default swaggerDef;

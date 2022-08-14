import { env } from '@/config/config';

const {
  version,
  name,
  description,
  author,
} = require('../../../package.json');

const swaggerDef = {
  basePath: '/api/v1',
  consumes: ['application/json'],
  host: `localhost:${env.PORT}`,
  info: {
    contact: {
      name: author,
      url: 'https://www.github.com/',
    },
    description,
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    title: name,
    version,
  },
  openapi: '3.0.0',
  produces: ['application/json'],
  schemes: ['http', 'https'],
  servers: [{
    url: `http://localhost:${env.PORT}/api/v1`,
  }],
};

export default swaggerDef;

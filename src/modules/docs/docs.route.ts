import { bearerAuth } from './securitySchemes.swagger';
import { env } from '@/config/env';
import authPaths from '@/modules/auth/swagger/auth.swagger.paths';
import express from 'express';
import swaggerDefinition from './swaggerDef';
import swaggerUi from 'swagger-ui-express';
import userPaths from '@/modules/user/swagger/users.swagger.paths';

const router = express.Router();

const swaggerDocumentation: swaggerUi.JsonObject = {
  ...swaggerDefinition,
  paths: {
    ...authPaths,
    ...userPaths,
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth,
    },
  },
};

const supportedSubmitMethods = env.NODE_ENV === 'development'
  ? ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
  : [''];

const options: swaggerUi.SwaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: env.NODE_ENV === 'development',
    supportedSubmitMethods,
  },
  explorer: true,
  customSiteTitle: 'API Documentation',
};

router.use(
  '/',
  swaggerUi.serve,
);

router.get(
  '/',
  swaggerUi.setup(swaggerDocumentation, options, { docExpansion: false }),
);

export default router;

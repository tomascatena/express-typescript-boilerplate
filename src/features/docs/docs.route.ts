import { bearerAuth } from './securitySchemes.swagger';
import { env } from '@/config/env';
import authPaths from '@/features/auth/swagger/auth.swagger.paths';
import express from 'express';
import swaggerDefinition from './swaggerDef';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const swaggerDocumentation: swaggerUi.JsonObject = {
  ...swaggerDefinition,
  paths: {
    ...authPaths,
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
    explorer: true,
    tryItOutEnabled: env.NODE_ENV === 'development',
    supportedSubmitMethods,
  },
};

router.use(
  '/',
  swaggerUi.serve,
);

router.get(
  '/',
  swaggerUi.setup(swaggerDocumentation, options),
);

export default router;

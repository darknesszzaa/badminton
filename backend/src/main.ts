import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

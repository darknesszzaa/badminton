import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import express = require('express');

async function bootstrap() {

  const privateKey = fs.readFileSync(path.resolve(__dirname, './../server-key.pem'));
  const certificate = fs.readFileSync(path.resolve(__dirname, './../server-crt.pem'));
  const ca = fs.readFileSync(path.resolve(__dirname, './../ca-crt.pem'));

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: privateKey,
      cert: certificate,
      ca,
    },
    cors: true,
  });

  const appExpress = express();
  const directory = path.resolve(__dirname, './../dist/bad');
  appExpress.use(express.static(directory));
  appExpress.get('/', (req, res, next) => {
    res.sendFile('/', { root: directory });
  });

  app.useGlobalPipes(new ValidationPipe());
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

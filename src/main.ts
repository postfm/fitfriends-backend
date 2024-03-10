import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || DEFAULT_PORT;
  app.setGlobalPrefix('fitfriends');

  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || DEFAULT_PORT;
  app.setGlobalPrefix('fitfriends');

  const config = new DocumentBuilder()
    .setTitle('Fit Friends')
    .setDescription('The fitFriends API description')
    .setVersion('1.0')
    .addTag('fitfriends')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DevKor BEstudy')
    .setDescription('Swagger Example of DevKor BEstudy')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        description: 'Jwt token',
        in: 'header',
      },
      'accessToken',
    )
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const docs = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();

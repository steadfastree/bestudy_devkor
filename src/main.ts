import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DevKor BEstudy')
    .setDescription('Swagger Example of DevKor BEstudy')
    .setVersion('1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();

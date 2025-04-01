import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost) 
 
  // Enable global validation for DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Enable Swagger
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('CIPMN CRM API')
    .setDescription('API Documentation for CIPMN CRM')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT Authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // API Docs available at /api/docs

  app.enableCors()
  await app.listen(3000);
}
bootstrap();

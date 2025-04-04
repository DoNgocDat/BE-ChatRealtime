import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as openurl from 'openurl'; // Sử dụng gói openurl

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',                     // local dev
      'https://smartchat-eslp.onrender.com',      // FE đã deploy
    ],
    credentials: true, // Nếu có gửi cookies hoặc Authorization header
  });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  if (process.env.NODE_ENV !== 'production') {
    openurl.open(`http://localhost:${port}/api`);
  }
}
bootstrap();
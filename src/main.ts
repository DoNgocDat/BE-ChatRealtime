import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as openurl from 'openurl'; // Sử dụng gói openurl

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token') // Thêm Bearer Token
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  // Tự động mở Swagger UI trong trình duyệt
  openurl.open('http://localhost:3000/api');
}
bootstrap();

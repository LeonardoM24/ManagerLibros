import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3001', // Permitir localhost:3001
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  })
  
  await app.listen(3000);
}
bootstrap();

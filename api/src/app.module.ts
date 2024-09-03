import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.modules';
import { join } from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({path:'../.env'}); // estando en ./api

// Ahora puedes acceder a las variables de entorno
console.log(process.env.DB_HOST);

const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = parseInt(process.env.DB_PORT || '3001', 10);
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
const DB_NAME: string = process.env.DB_NAME || 'name';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: false,
    }),
    LibrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Libro } from "./libro.entity";
import { LibrosController } from "./libros.controller";
import { LibrosService } from "./libros.service";

@Module({
    imports:[TypeOrmModule.forFeature([Libro])],
    controllers: [LibrosController],
    providers: [LibrosService],
})
export class LibrosModule{}
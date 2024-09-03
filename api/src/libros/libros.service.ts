import { flatten, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Libro } from "./libro.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { CrearLibroDto } from "./dtos/crear-libro.dto";
import { MostrarLibrosDto } from "./dtos/mostrar-libro.dto";


@Injectable()
export class LibrosService{
    constructor(@InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>){}

    async create(dto: CrearLibroDto){
        const libro = this.libroRepository.create(dto);

        return await this.libroRepository.save(libro);
    }

    async mostrar(dto: MostrarLibrosDto){
        const where: any = {};
        if(dto.titulo){
            where.titulo = dto.titulo;
        }
        if(dto.autor){
            where.autor = dto.autor;
        }
        if(dto.editorial){
            where.editorial = dto.editorial
        }
        if(dto.disponible !== null && dto.disponible !== undefined){
            if(dto.disponible === true){
                where.cantidad = MoreThanOrEqual(1);
            }
            if(dto.disponible === false){
                where.cantidad = 0;
            }
        }
        return this.libroRepository.find({where})
    }
}
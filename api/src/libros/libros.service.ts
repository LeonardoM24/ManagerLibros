import { flatten, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Libro } from "./libro.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { CrearLibroDto } from "./dtos/crear-libro.dto";
import { MostrarLibrosDto } from "./dtos/mostrar-libro.dto";
import { ActualizarLibroDto } from "./dtos/actualizar-libro.dto";


@Injectable()
export class LibrosService{
    constructor(@InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>){}

    async crear(dto: CrearLibroDto){
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

    async actualizar(id: number, dto: ActualizarLibroDto){
        const libro = await this.libroRepository.findOne({where: {id}});
        
        if(!libro){
            throw new NotFoundException(`Libro con ID ${id} no encontrado`)
        }
        
        Object.assign(libro, dto);

        return await this.libroRepository.save(libro);
    }

    async borrar(id: number){
        const libro = await this.libroRepository.findOne({where: {id}})

        return await this.libroRepository.remove(libro);
    }
}
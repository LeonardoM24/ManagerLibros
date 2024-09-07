import { flatten, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Libro } from "./libro.entity";
import { MoreThanOrEqual, QueryBuilder, Repository } from "typeorm";
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

    async mostrar(query: MostrarLibrosDto){
        const { titulo, autor, editorial, disponible } = query;
        const queryBuilder = this.libroRepository.createQueryBuilder('libro');

        if (titulo && titulo !== '') {
            queryBuilder.andWhere('libro.titulo LIKE :titulo', { titulo: `%${titulo}%` });
        }
        if (autor && autor !== '') {
            queryBuilder.andWhere('libro.autor LIKE :autor', { autor: `%${autor}%` });
        }

        if (editorial && editorial  !== '') {
            queryBuilder.andWhere('libro.editorial LIKE :editorial', { editorial: `%${editorial}%` });
        }
        console.log("hola " + typeof(disponible))

        
        if(disponible === "true"){
            queryBuilder.andWhere('libro.cantidad > :cantidad', { cantidad: 0 });
        }else if(disponible === "false"){
            queryBuilder.andWhere('libro.cantidad = :cantidad', { cantidad: 0 });
        }
        

        return await queryBuilder.getMany()
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
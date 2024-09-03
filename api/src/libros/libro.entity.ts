import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'libros'})
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo: string;

    @Column()
    cantidad: number;
    
    @Column()
    autor: string;

    @Column()
    descripcion: string;

    @Column()
    editorial: string;

    @Column()
    imagen: string;

}
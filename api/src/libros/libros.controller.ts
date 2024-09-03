import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { LibrosService } from "./libros.service";
import { CrearLibroDto } from "./dtos/crear-libro.dto";
import { MostrarLibrosDto } from "./dtos/mostrar-libro.dto";
import { ActualizarLibroDto } from "./dtos/actualizar-libro.dto";

@Controller('libros')
export class LibrosController{
    constructor(private readonly librosService: LibrosService){}

    @Post('crear')
    crear(@Body() dto: CrearLibroDto){
        /*
        post
        http://localhost:3000/libros/crear
        body raw json
        {
            "titulo": "Como programar 3",
            "cantidad": 10,
            "autor": "Ksito",
            "descripcion": "Este es un libro super interesante de programar tercera parte",
            "editorial":"Postres inc.",
            "imagen": ""
        }
        */
        return this.librosService.crear(dto);
    }
    
    @Get('mostrar')
    mostrar(@Body() dto: MostrarLibrosDto){
        /*
        get
        http://localhost:3000/libros/mostrar
        body raw json  (todos los campos son opcionales)
        {
            "titulo": "Como programar 3",
            "autor": "Ksito",
            "editorial":"Postres inc.",
            "disponible": true
        }
        */
        return this.librosService.mostrar(dto);
    }
    
    @Put('actualizar/:id')
    actualizar(@Param('id') id: number, @Body() dto: ActualizarLibroDto){
        /*
        put
        http://localhost:3000/libros/actualizar/:id
        body raw json (opcionales)
        {
            "titulo": "Como programar 3",
            "cantidad": 10,
            "autor": "Ksito",
            "descripcion": "Este es un libro super interesante de programar tercera parte",
            "editorial":"Postres inc.",
            "imagen": ""
        }
        */
        return this.librosService.actualizar(id,dto);
    }

}
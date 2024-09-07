import { UploadedFile ,Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors, Query } from "@nestjs/common";
import { LibrosService } from "./libros.service";
import { CrearLibroDto } from "./dtos/crear-libro.dto";
import { MostrarLibrosDto } from "./dtos/mostrar-libro.dto";
import { ActualizarLibroDto } from "./dtos/actualizar-libro.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path'
import { error } from "console";
import { Express, query } from "express";

@Controller('libros')
export class LibrosController{
    constructor(private readonly librosService: LibrosService){}

    @Post('crear')
    @UseInterceptors(FileInterceptor('imagen', {
        storage: diskStorage({
            destination: './img',
            filename: (req, file, cb) =>{
                // cambiar el nombr del archivo al ID del libro
                const id = req.body.id;
                const fileExt = extname(file.originalname);
                cb(null, `${id}${fileExt}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)){
                cb(null, true);
            } else{
                cb(new Error('Tipo de archivo no soportado'), false);
            }
        }
    }))
    async crear(@UploadedFile() file: Express.Multer.File , @Body() dto: CrearLibroDto){
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
        const imagePath = file ? `/img/${file.filename}` : null;
        const nuevoLibro = { ...dto, imagen: imagePath }
        
        const libroCreado = await this.librosService.crear(nuevoLibro);

        if (file && libroCreado){
            const newFileName = `${libroCreado.id}${extname(file.originalname)}`;
            const fs = require('fs');
            const oldPath = `./img/${file.filename}`;
            const newPath = `./img/${newFileName}`;
            fs.renameSync(oldPath, newPath);
            libroCreado.imagen = `/img/${newFileName}`;
            await this.librosService.actualizar(libroCreado.id, { imagen: libroCreado.imagen });
        }

        return libroCreado;
    }
    
    @Get('mostrar')
    mostrar(@Query() query: MostrarLibrosDto){
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
        
        return this.librosService.mostrar(query);
    }
    
    @Put('actualizar/:id')
    @UseInterceptors(FileInterceptor('imagen', {
        storage: diskStorage({
            destination: './img',
            filename: (req, file, cb) => {
                const id = req.params.id;
                const fileExt = extname(file.originalname);
                cb(null, `${id}${fileExt}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            } else {
                cb(new Error('Tipo de archivo no soportado'), false);
            }
        }
    }))
    async actualizar(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: ActualizarLibroDto)
    {
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
        const imagePath = file ? `/img/${id}${extname(file.originalname)}` : dto.imagen;
        const libroActualizado = await this.librosService.actualizar(id, { ...dto, imagen: imagePath })
        return libroActualizado;
    }

    @Delete('borrar/:id')
    borrar(@Param('id') id: number){
        /*
        delete
        http://localhost:3000/libros/borrar/:id
        */
        return this.librosService.borrar(id);
    }

}
# ManagerLibros
App en la que se administran libros

## Descripción 
Esta aplicación permite a los usuarios ver y filtrar libros de una base de datos, así como agregar nuevos libros a la misma. Está diseñada para facilitar la gestión de una colección de libros con una interfaz amigable y funcional. 

---
## Requerimientos

### Requerimientos Funcionales 
* RF1: Ver, filtrar libros de la base de datos
* RF2: Base de datos para los libros
* RF3: Crear, el usuario puede agregar libros a BD 
* RF4: Se pueden ver detalles de los libros
* RF5: Update, editar libros existentes
* RF6: Delete, se pueden borrar libros de la base de datos

### Requerimientos NO Funcionales 
* RNF1: Base de datos en sql
* RNF2: Front en Next.js
* RNF3: Back en Nest.js
* RNF4: UI/UX Bonito y amigable
* RNF5: Responsiva con soporte para el telefono
* RF6: Delete, se pueden borrar libros de la base de datos

----
## Base de datos

La base de datos sera hecha en SQL.
Esta sera muy simple tomando en cuenta que lo unico que se busca es editar y en general "manejar" libros, por lo que sol tendremos una tabla libros de la siguiente forma:

Tabla: Libros
atributos:
* id
* titulo
* cantidad
* autor
* descripción
* imagen
* editorial


## API

Para instalar la api necesitas nest por lo que debes instalarlo.
Tambien se instalara lo necesario para conectar la base de datos.
Yo uso una de tipo mysql con typeOrm. 
```bash
npm i -g @nestjs/cli
npm install --save @nestjs/typeorm typeorm mysql2
```

### correr api

La api se conecta a una base de datos mysql, por lo que debes tener la tuya, en esta ademas debes tener un .env en la carpeta del proyecto, con las credenciales de la siguiente forma:

```
DB_HOST=localhost
DB_PORT=3000
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=test
```

y debes tener instalado la libreria dotenv

```
npm install dotenv
```

para correr la api correr el siguiente comando en la carpeta api

``` bash
cd api 
npm run start
```


### correr webAPP

La pagina web esta en next.js, por lo que  debes tenerlo instalado.

se corre con


``` bash
cd webAPP 
npm run dev
```
const express = require('express');


//CORS
const cors = require('cors')

//Base de datos
const { dbConnection } = require('../database/config')
 
class Server {
    constructor () {
        this.app = express();

        // Puerto
        this.port = process.env.PORT;

        // Path
        this.usuariosPath = "/api/usuarios";

        // Login
        this.authPath = "/api/auth";


        // Categoria
        this.categoriasPath = "/api/categorias";


        //db
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    // base de datos
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        ///middleware es lo que pasa entre el pedido y el backend

        // CORS: autorizacion que nos permite conectarnos con otro servidor o nuestra base de datos
        this.app.use(cors());

        this.app.use(express.json());

        // MOstrar carpetas publicas
        this.app.use(express.static('public'));
    }

    routes() {  
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.authPath, require("../routes/auth"))
        this.app.use(this.categoriasPath, require("../routes/categorias"))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server online", this.port);
        })
    }
}

module.exports = Server;
const express = require('express');


//CORS
const cors = require('cors')

class Server {
    constructor () {
        this.app = express();

        // Puerto
        this.port = process.env.PORT;

        // Path
        this.usuariosPath = "/api/usuarios";


        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {
        ///middleware es lo que pasa entre el pedido y el backend

        // CORS: autorizacion que nos permite conectarnos con otro servidor o nuestra base de datos
        this.app.use(cors());

        // MOstrar carpetas publicas
        this.app.use(express.static('public'));
    }

    routes() {  
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server online", this.port);
        })
    }
}

module.exports = Server;
// console.log("Hello world");

// const express = require('express');

// const app = express();

// Todos estos metodos salen de express

// app.get('/', (req, res) => {
     // req es resquest, es una peticion
     //res es response, es lo que devuelve   
//     res.send("Mensaje recibido");
// })

// app.listen(3000)


const Server = require('./models/server');

const server = new Server();

server.listen();
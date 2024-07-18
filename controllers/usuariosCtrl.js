const { response, request } = require('express');


// Controlador GET
const usuariosGet = (req=request, res=response)=> {
    const {limit, key} = req.query;
    res.json({
        mesaje: "Recibo el mensaje",
        limit,
        //! key
    })
}

// Controlador POST
const usuariosPost = (req=request, res=response)=> {
    const {limit, key} = req.query;
    res.json({
        mesaje: "Envio el mensaje"
    })
}

// Controlador PUT
const usuariosPut = (req=request, res=response)=> {
    const {limit, key} = req.query;
    res.json({
        mesaje: "Modifico datos"
    })
}

// Controlador POST
const usuariosDelete = (req=request, res=response)=> {
    const {limit, key} = req.query;
    res.json({
        mesaje: "Elimino datos"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
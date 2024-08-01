const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');


// Controlador GET
const usuariosGet = async (req=request, res=response)=> {

    // Pedidos de lista completa
    // const usuarios = await Usuario.find();

    const {desde=0, limite} = req.query;

    const estadoTrue = {estado: true};

    // const usuarios = await Usuario.find().skip(desde).limit(limite);
    // const total = await Usuario.countDocuments();


    // Optimizar respuestas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(estadoTrue),
        Usuario.find(estadoTrue).skip(desde).limit(limite)
    ])


    res.json({
        mesaje: "Recibo el mensaje",
        total,
        usuarios,
        
    })
}

// Controlador POST
const usuariosPost = async (req=request, res=response)=> {
    const datos = req.body;
    const { nombre, correo, password, rol } = datos;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);

    // usuario.password = hash;

    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();


    res.json({
        usuario,
        mesaje: "Envio el mensaje"
    })
}

// Controlador PUT
const usuariosPut = async (req=request, res=response)=> {
    const {id} = req.params;

    const {password, ...updUsuario} = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        updUsuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, {new: true,});
    res.json({
        mesaje: "Modifico datos",
        usuario
    });
}

// Controlador DELETE
const usuariosDelete = async (req=request, res=response)=> {
    const {id} = req.params;

    const usuarioAdmin = req.usuario;

    const usuario = await Usuario.findById(id);

    if (!usuario.estado){
        return res.json({
            msg: "El usuario ya esta inactivo"
        })
    }

    // Cambiar el valor del estado
    const usuarioInactivo = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true})

    res.json({
        mesaje: "Elimino datos",
        usuarioInactivo,
        usuarioAdmin
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
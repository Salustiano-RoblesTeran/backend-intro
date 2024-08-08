const {response, request} = require("express");

const Curso = require('../models/cursos')


const crearCurso = async (req = request, res = response) => {
        // Recibo datos del front
        const { precio, categoria, imagen, descripcion } = req.body;
    
        const nombre = req.body.nombre.toUpperCase();
        // Validar
        const cursoDB = await Curso.findOne({ nombre });

        if (cursoDB) {
            res.status(400).json({
                msg: `El curso ${cursoDB.nombre} ya existe`
            })
        }

        // Vinculamos al usuario con el curso
        const data = {
            nombre,
            categoria,
            precio,
            imagen,
            descripcion,
            usuario: req.usuario._id,
          };
          
        // Nueva instancia del esquema
        const curso = new Curso(data)

        // Guardar en DB
        await curso.save();

        if (curso) {
            res.status(201).json({
              curso,
              msg: "El curso fue creada con exito!",
            });
          }
}

module.exports = {
    crearCurso,
}
const {response, request} = require("express");
const Categoria = require("../models/categorias");


// Controlador GET
const obtenerCategoria = async (req = request, res = response) => {
    const { desde = 0, limite = 0} = req.body;
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(desde).limit(limite)
        //! METODO POPULATE: SIRVE PARA INFORMAR LAS PROPIEDADES DEL USUARIO QUE HIZO EL PEDIDO
        .populate("usuario", "correo")


    ]);

    res.json({
        total,
        categorias,
    })
}

// Controlador GET/ID

const obtenerCategoriaId = async (req = request, res = response) => {

    // Recibo del front
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate("usuario", "nombre correo");

    res.json({
        categoria
    })
}

// Controlador POST
const crearCategoria = async (req = request, res = response) => {
    // Recibo datos del front
    const nombre = req.body.nombre.toUpperCase();

    // Validar en DB
    const categoriasDB = await Categoria.findOne({nombre});

    if (categoriasDB) {
        res.status(400).json({
            msg: `La categoria ${categoriasDB.nombre} ya existe`
        })
    }

    // Data
    const data = {
        nombre,
        usuario: req.usuario._id,
    }

    // Crear nueva instancia
    const categoria = new Categoria(data);

    // Enviar a la DB
    await categoria.save();

    // Respuesta al front
    if (categoria) {
        res.status(201).json({
            categoria,
            msg: "La categoria fue creada con exito!"
        })
    }
}

const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
  
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;
  
    const data = {
      nombre,
      usuario,
    };
  
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  
    res.status(201).json({
      msg: "Categoria actualizada!",
      categoria,
    });
  };
  
  const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
  
    const categoriaEliminada = await Categoria.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
  
    res.json({
      categoriaEliminada,
      msg: "Categoria eliminada!",
    });
  };
  

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaId,
    borrarCategoria,
    actualizarCategoria,
}
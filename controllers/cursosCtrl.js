const {response, request} = require("express");

const Curso = require('../models/cursos')

// CONTROLADOR POST
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

// CONTROLADOR GET
const obtenerCursos = async (req = request, res = response) => {
  const { desde = 0, limite = 0} = req.body;
  const query = { estado: true }

  const [total, cursos] = await Promise.all([
      Curso.countDocuments(query),
      Curso.find(query).skip(desde).limit(limite)
      //! METODO POPULATE: SIRVE PARA INFORMAR LAS PROPIEDADES DEL USUARIO QUE HIZO EL PEDIDO
      .populate("usuario", "correo")


  ]);

  res.json({
      total,
      cursos,
  })
}

// Controlador GET/ID

const obtenerCursoId = async (req = request, res = response) => {

  // Recibo del front
  const {id} = req.params;

  const curso = await Curso.findById(id).populate("usuario", "nombre correo");

  res.json({
    curso
  })
}


// Controlador PUT

const actualizarCurso = async (req = request, res = response) => {
  const { id } = req.params;

  const nombre = req.body.nombre.toUpperCase();
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagen;
  const precio = req.body.precio;
  const estado = req.body.estado;
  const categoria = req.body.categoria;
  
  const usuario = req.usuario._id;

  const data = {
    nombre,
    descripcion,
    imagen,
    precio,
    estado,
    categoria,
    usuario,
  };

  const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Curso actualizada!",
    curso,
  });
};

  // Controlador DELETE 

  const borrarCurso = async (req = request, res = response) => {
    const { id } = req.params;
  
    const cursoEliminado = await Curso.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
  
    res.json({
      cursoEliminado,
      msg: "Curso eliminada!",
    });
  };

module.exports = {
    crearCurso,
    obtenerCursos,
    obtenerCursoId,
    actualizarCurso,
    borrarCurso
}
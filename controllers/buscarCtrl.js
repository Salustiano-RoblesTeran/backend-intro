const { response, request } = require("express");

const Usuario = require("../models/usuario");
const Curso = require("../models/cursos");
const Categoria = require("../models/categorias");

const coleccionesPermitidas = ["usuarios", "categorias", "cursos"];

const buscarUsuario = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCurso = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const cursos = await Curso.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: cursos,
  });
};

const buscarCategorias = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
     nombre: regex,
     estado: true,
  });

  res.json({
    results: categorias,
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuario(termino, res);
      break;

    case "categorias":
      buscarCategorias(termino, res);
      break;

    case "cursos":
      buscarCurso(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Error interno al realizar la busqueda!",
      });
      break;
  }
};

module.exports = {
  buscar,
};
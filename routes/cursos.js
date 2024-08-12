const {Router} = require('express');
const { crearCurso, obtenerCursos, obtenerCursoId, actualizarCurso, borrarCurso } = require('../controllers/cursosCtrl');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const { esAdminRol } = require('../middlewares/validarRoles');
const { esIdCursoValido } = require('../helpers/db_validators')


const router = Router();

// Ruta POSTS
router.post("/", [
    validarJWT,
    esAdminRol,
    check("nombre", "Este campo es obligatorio").notEmpty(),
    check("descripcion", "Este campo es obligatorio").notEmpty(),
    check("imagen", "Este campo es obligatorio").notEmpty(),
    check("precio", "Este campo es obligatorio").notEmpty(),
    validarCampos,
], crearCurso)

// Ruta GET - TODOS LOS CURSOS
router.get('/',[
    validarJWT,
    esAdminRol,
  ], obtenerCursos)
  
  // Ruta GET - CURSO ESPECIFICO POR ID
  router.get('/:id',[
    validarJWT,
  ], obtenerCursoId)

  // Ruta PUT
  router.put(
    "/:id",
    [
      validarJWT,
      esAdminRol,
      check("nombre", "Este campo es obligatorio").notEmpty(),
      check("descripcion", "Este campo es obligatorio").notEmpty(),
      check("imagen", "Este campo es obligatorio").notEmpty(),
      check("precio", "Este campo es obligatorio").notEmpty(),
      validarCampos,
    ],
    actualizarCurso
  );

  // Ruta DELETE

  router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRol,
      check("id", "El id no es valido").isMongoId(),
      check("id").custom(esIdCursoValido),
      validarCampos,
    ],
    borrarCurso
  );

module.exports = router;
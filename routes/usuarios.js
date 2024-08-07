const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosCtrl');
const { validarCampos } = require('../middlewares/validarCampos');
const {esMailValido, esRolValido, esIdValido} = require('../helpers/db_validators')
const {validarJWT}  = require('../middlewares/validarJwt')
const {esAdminRol} = require('../middlewares/validarRoles')

const router = Router();


// Ruta GET
router.get('/',[
  validarJWT,
  esAdminRol,
], usuariosGet)

// Ruta GET - USUARIO
router.get('/:id',[
  validarJWT,
], usuariosGet)

// Ruta POST
router.post('/',[check("nombre", "El nombre es obligatorio").notEmpty(), 
    check("password", "La contraseña debe tener como minimo 6 caracteres").isLength({min:6}),
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos],usuariosPost);

// Ruta PUT
router.put(
    "/:id",
    [
      check("id", "No es un ID valido!").isMongoId(),
      check("id").custom(esIdValido),
      validarCampos,
    ],
    usuariosPut
  );

// Ruta DELETE
router.delete('/:id',     
    [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosDelete)


module.exports = router;
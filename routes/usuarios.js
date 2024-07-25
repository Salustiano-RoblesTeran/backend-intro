const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosCtrl');
const { validarCampos } = require('../middlewares/validarCampos');
const {esMailValido, esRolValido} = require('../helpers/db_validators')

const router = Router();


// Ruta GET
router.get('/', usuariosGet)

// Ruta POST
router.post('/',[check("nombre", "El nombre es obligatorio").notEmpty(), 
    check("password", "La contraseña debe tener como minimo 6 caracteres").isLength({min:6}),
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos],usuariosPost);

// Ruta PUT
router.put('/:id', usuariosPut)

// Ruta DELETE
router.delete('/:id', usuariosDelete)


module.exports = router;
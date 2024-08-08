const {Router} = require('express');
const { crearCurso } = require('../controllers/cursosCtrl');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const { esAdminRol } = require('../middlewares/validarRoles');


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


module.exports = router;
const { Router } = require('express');
const {check} = require('express-validator')
const { crearCategoria, obtenerCategoria, obtenerCategoriaId } = require('../controllers/categoriasCtrl');
const { esAdminRol } = require('../middlewares/validarRoles');
const { validarJWT } = require('../middlewares/validarJwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { esCategoriaValida } = require('../helpers/db_validators');

const router = Router();

router.get("/", [
    validarJWT,
    esAdminRol,
    validarCampos
], obtenerCategoria)

router.get("/:id", [
    validarJWT,
    validarCampos
], obtenerCategoriaId)


router.post("/", [
    validarJWT,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id").custom(esCategoriaValida),
    validarCampos
    ], crearCategoria)


module.exports = router;
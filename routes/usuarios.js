const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosCtrl')

const router = Router();


// Ruta GET
router.get('/', usuariosGet)

// Ruta POST
router.post('/', usuariosPost)

// Ruta PUT
router.put('/:id', usuariosPut)

// Ruta DELETE
router.delete('/:id', usuariosDelete)


module.exports = router;
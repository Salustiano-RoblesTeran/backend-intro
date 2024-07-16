const { Router } = require('express');

const router = Router();


// Ruta GET
router.get('/', (req, res) => {
    res.json({
        mesaje: "Recibo el mensaje"
    })
})

// Ruta POST
router.post('/', (req, res) => {
    res.json({
        mesaje: "Envio el mensaje"
    })
})

// Ruta PUT
router.put('/:id', (req, res) => {
    res.json({
        mesaje: "Modifico datos"
    })
})

// Ruta DELETE
router.delete('/:id', (req, res) => {
    res.json({
        mesaje: "Elimino datos"
    })
})


module.exports = router;
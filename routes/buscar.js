const { Router } = require("express");
const { buscar } = require("../controllers/buscarCtrl");

const router = Router();

//GET
router.get("/:coleccion/:termino", buscar);

module.exports = router;
const { request, response } = require('express');

const esAdminRol = async (req = request, res=respons, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Necesita validar token",
    })
    }

    const {rol, nombre } = req.usuario;

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next();
}

module.exports = {
    esAdminRol,
}
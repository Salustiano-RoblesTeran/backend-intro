const Usuario = require('../models/usuario');
const Rol = require('../models/rol')

const esMailValido = async (correo) => {
    const exiteCorreo = await Usuario.findOne({correo});

    if (exiteCorreo) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

const esRolValido = async (rol) => {
    const exiteRol = await Rol.findOne({rol});

    if (!exiteRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
}

module.exports = {
    esMailValido, esRolValido,
};
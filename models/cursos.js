const { Schema, model } = require('mongoose');

// nueva coleccion: Cursos: Propiedades: nombrCurso, descripcion, imagen, precio, estado: true, usar esquema categoria, usar esquema usuario para ver quien lo crea, destacados: booleano: false

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    imagen: {
        type: String,
        required: [true, "Debe subir una imagen"]
    },
    precio: {
        type: Number,
        required: [true, "Debe ingresar el precio del curso"],
        default: 0,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario", 
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    }

})

module.exports = model("Curso", CursoSchema);
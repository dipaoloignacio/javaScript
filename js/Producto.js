const mongoose = require('mongoose')

const Productos = mongoose.model('Producto', {
    tipo: { type: String, require: true, minLength: 3 },
    nombre: { type: String, require: true, minLength: 3 },
    precio: { type: Number, require: true},
    envio: { type: String, require: true }
});

module.exports = Productos
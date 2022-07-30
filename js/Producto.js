const mongoose = require('mongoose')

const Productos = mongoose.model('Producto', {
    tipo: { type: String, require: true},
    nombre: { type: String, require: true},
    precio: { type: Number, require: true},
    envio: { type: String, require: true }
});

module.exports = Productos
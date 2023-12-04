const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombreProducto: { type: String, required: true },
  descripcionProducto: { type: String, required: true },
  precio: { type: Number, required: true },
  imagenProducto: { type: String, required: false },
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;



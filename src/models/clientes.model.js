const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  imagenCliente: { type: String, required: false },
  infoContacto: { type: String, required: true, unique: true },
  correoElectronico: { type: String, required: true, unique: true },
  contrasenna: { type: String, required: true },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;

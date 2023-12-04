const mongoose = require('mongoose');

const emprendimientoSchema = new mongoose.Schema({
  nombreEmprendimiento: { type: String, required: true, unique: true },
  imagenEmprendimiento: { type: String, required: false },
  infoContacto: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  descripcion: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  puntuacionPromedio: { type: Number },
});

const Emprendimiento = mongoose.model('Emprendimiento', emprendimientoSchema);

module.exports = Emprendimiento;

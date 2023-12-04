const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
  id_emprendimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Emprendimiento', required: true },
  id_cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  puntuacion: { type: Number, required: true },
  comentario: { type: String },
});

const Calificacion = mongoose.model('Calificacion', calificacionSchema);

module.exports = Calificacion;

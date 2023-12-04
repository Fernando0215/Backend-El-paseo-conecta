const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  id_emprendimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Emprendimiento', required: true },
  mensaje: { type: String, required: true },
  imagenes: [{ type: Buffer }], // Almacena imágenes 
  reacciones: {
    hearts: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  }
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

module.exports = Noticia;


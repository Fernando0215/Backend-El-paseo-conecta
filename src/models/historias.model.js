const mongoose = require('mongoose');

const historiaSchema = new mongoose.Schema({
  id_emprendimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Emprendimiento', required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  fechaPublicacion: { type: Date, default: Date.now },
});

const Historia = mongoose.model('Historia', historiaSchema);

module.exports = Historia;


/* const mongoose = require('mongoose');
const Cliente = require('./clientes');
const Emprendimiento = require('./emprendimientos');
const Producto = require('./productos');
const Noticia = require('./noticias');
const Calificacion = require('./calificaciones');
const Favorito = require('./favoritos');
const Historia = require('./historias');

// Configuración de la conexión a MongoDB Atlas
mongoose.connect('tu_url_de_conexion_a_mongodb_atlas', { useNewUrlParser: true, useUnifiedTopology: true });

// Resto de tu lógica de aplicación...
*/ 
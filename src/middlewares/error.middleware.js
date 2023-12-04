const debug = require('debug')('app-api:error');
const app = express();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productos/'); // Ajusta la ruta según tu estructura de carpetas
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg'); // Puedes ajustar la lógica de nombres de archivos según tus necesidades
  },
});

const upload = multer({ storage: storage });

app.post('/productos', upload.single('imagenProducto'), productos.controller.createProducto);

const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message });
};

module.exports = { errorHandler };
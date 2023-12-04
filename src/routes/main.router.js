const express = require('express');
const router = express.Router();

/*const noticiasRouter = require('./noticias.router');
router.use('/noticias', noticiasRouter);*/
const emprendimientosRouter = require('./emprendimientos.router');
router.use('/emprendimientos', emprendimientosRouter);

const clientesRouter = require('./clientes.router');
router.use('/clientes', clientesRouter);

const productosRouter = require('./productos.router');
router.use('/productos', productosRouter);

module.exports = router;
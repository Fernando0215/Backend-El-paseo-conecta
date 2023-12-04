const { body, param, validationResult } = require('express-validator');
const { runValidation } = require('../middlewares/validator.middleware');
const { createProducto, getProducto, getOneProducto, updateProducto, reactToProducto } = require('../controllers/productos.controller');
const httpError = require('http-errors');

const createProductoValidator = [
  body('nombreProducto').notEmpty().isString().isLength({ min: 3, max: 24 }).withMessage('El campo nombreProducto es obligatorio'),
  body('descripcionProducto').notEmpty().isLength({ min: 8, max: 240 }).isString().withMessage('El campo descripcionProducto es obligatorio'),
  body('precio').notEmpty().isNumeric().withMessage('El campo precio debe ser un número'),
  body('imagenProducto')
];

const updateProductosValidator = [
  body('nombreProducto').notEmpty().isString().isLength({ min: 3, max: 24 }).withMessage('El campo nombreProducto es obligatorio y debe de tener al menos 8 caracteres'),
  body('descripcionProducto').notEmpty().isLength({ min: 8, max: 240 }).isString().withMessage('El campo descripcionProducto es obligatorio y debe de tener al menos 8 caracteres o 240'),
  body('precio').notEmpty().isNumeric().withMessage('El campo precio debe ser un número y es obligatorio'),
  body('imagenProducto')
];

const idInParams = [
  param('id')
    .notEmpty().withMessage('id field is required')
    .isMongoId().withMessage('id must be mongo id'),
];


module.exports = {
  idInParams,
  createProductoValidator,
  updateProductosValidator,
};

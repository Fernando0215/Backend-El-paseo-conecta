const { body, param, validationResult } = require('express-validator');
const { runValidation } = require('../middlewares/validator.middleware');
const { createCliente, getCliente, getOneCliente } = require('../controllers/clientes.controller');
const httpError = require('http-errors');


const createClienteValidator = [
    body('nombre').notEmpty().isString().isLength({ min: 3, max: 24 }).withMessage('El campo nombre es obligatorio'),
    body('apellido').notEmpty().isString().isLength({ min: 3, max: 24 }).withMessage('El campo apellido es obligatorio'),
    body('imagenCliente'),
    body('correoElectronico').notEmpty().isLength({ min: 8, max: 240 }).isString().withMessage('El campo correoElectronico es obligatorio'),
    body('contrasenna').notEmpty().isLength({ min: 8, max: 24 }).isString().withMessage('El campo descripcion es obligatorio'),
  ];

  const idInParams = [
    param("id")
      .notEmpty().withMessage("id field is required")
      .isMongoId().withMessage("id must be mongo id")
  ]

  module.exports = {
    idInParams,
    createClienteValidator,
  };
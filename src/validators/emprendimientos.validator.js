const { body, param, validationResult, check } = require('express-validator');
const { runValidation } = require('../middlewares/validator.middleware');
const { createEmprendimiento, getEmprendimiento, getOneEmprendimiento } = require('../controllers/emprendimientos.controller');
const httpError = require('http-errors');


const createEmprendimientoValidator = [
    body('nombreEmprendimiento').notEmpty().isString().isLength({ min: 3, max: 24 }).withMessage('El campo nombreEmprendimiento es obligatorio'),
    body('imagenEmprendimiento').notEmpty().isString(),
    body('infoContacto').notEmpty().isNumeric().withMessage('El campo contacto debe ser un número'),
    body('direccion').notEmpty().isLength({ min: 8, max: 240 }).isString().withMessage('El campo direccion es obligatorio'),
    body('descripcion').notEmpty().isLength({ min: 8, max: 240 }).isString().withMessage('El campo descripcion es obligatorio'),
    body('correo').notEmpty().isLength({ min: 8, max: 32 }).isString().withMessage('El campo correo es obligatorio'),
    body('password').notEmpty().isLength({ min: 8, max: 10 }).isString().withMessage('El campo password es obligatorio'),
  ];

  const idInParams = [
    param("id")
      .notEmpty().withMessage("id field is required")
      .isMongoId().withMessage("id must be mongo id")
  ]

  const emailInParams = [
    check('correo')
      .notEmpty().withMessage('Correo field is required')
      .isEmail().withMessage('Correo must be a valid email address'),
  ];

  module.exports = {
    idInParams,
    createEmprendimientoValidator,
    emailInParams,
  };
  
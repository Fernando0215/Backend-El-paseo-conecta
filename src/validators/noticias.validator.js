const { body, oneOf } = require("express-validator");

const createNoticiaValidator = [
  oneOf([
    body('mensaje')
      .isString().withMessage("mensaje debería ser una cadena de texto")
      .trim()
      .isLength({ min: 5 }).withMessage("mensaje debería tener al menos 5 caracteres"),
    body('imagenes')
      .isArray({ min: 1 }).withMessage("Debería haber al menos una imagen"),
  ]),
];


  const updateNoticiaValidator = [
    body('mensajeCombinado')
    .optional() // Hace que esta validación sea opcional, ya que puede no estar presente si no hay imágenes
    .isString().withMessage("mensajeCombinado debería ser una cadena de texto")
    .trim()
    .isLength({ min: 5 }).withMessage("mensajeCombinado debería tener al menos 5 caracteres"),

  ];

  module.exports = {createNoticiaValidator,
    updateNoticiaValidator,
};
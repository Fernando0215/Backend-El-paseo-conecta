const { validationResult } = require('express-validator');
const debug = require("debug")("app-api:validator");

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        debug(errors);
        return res.status(400).json({
          errors: errors.array().map(item => item.msg)
        });
      }
      next();
  };

  module.exports = { runValidation };
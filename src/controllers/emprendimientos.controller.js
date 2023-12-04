const httpError = require("http-errors");

const Emprendimiento = require("../models/emprendimientos.model");

const createEmprendimiento = async (req, res, next) => {
    try {
      console.log("Datos recibidos en el servidor:", req.body);
  
      const { body } = req;
  
      // Verificar duplicados con $or
      const existingEmprendimiento = await Emprendimiento.find({
        $or: [
          { correo: body.correo },
          { nombreEmprendimiento: body.nombreEmprendimiento },
          { infoContacto: body.infoContacto },
        ],
      });
  
      if (existingEmprendimiento.length > 0) {
        // Si ya existe, enviar una respuesta con código 409 y el mensaje adecuado
        return res.status(409).json({
          message: 'Correo, nombre o contacto ya registrados',
        });
      }
  
      // Si no hay duplicados, crear el nuevo emprendimiento
      const newEmprendimiento = new Emprendimiento({
        ...body,
      });
  
      const savedEmprendimiento = await newEmprendimiento.save();
  
      if (!savedEmprendimiento) throw httpError(500, "Emprendimiento no creado");
  
      res.status(201).json({
        message: "Emprendimiento creado y registrado correctamente",
        data: savedEmprendimiento,
      });
    } catch (error) {
      console.error(error);
      // Asegúrate de enviar la respuesta correcta en el caso de duplicados
      if (error.name === 'MongoError' && error.code === 11000) {
        res.status(409).json({
          message: 'Correo, nombre o contacto ya registrados',
        });
      } else {
        next(error);
      }
    }
  };
  

  const getEmprendimiento = async (req, res, next) => {
    try {
        const emprendimientos = await Emprendimiento.find();
        if (!emprendimientos) throw httpError(404, "ningun emprendimiento encontrado");
        res.status(200).json({ data: emprendimientos });
    } catch (error) {
      next(error);
    }
  };

  const getOneEmprendimiento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const emprendimiento = await Emprendimiento.findById(id);

        if (!emprendimiento) throw httpError(404, "Emprendimiento no encontrado");
        res.status(200).json({ data: emprendimiento });

    } catch (error) {
      next(error);
    }
  };

  const getEmprendimientoByEmail = async (req, res, next) => {
    try {
      const { correo } = req.params;
      const emprendimiento = await Emprendimiento.findOne({ correo });
  
      if (!emprendimiento) {
        throw httpError(404, "Emprendimiento no encontrado");
      }
  
      res.status(200).json({ data: emprendimiento });
    } catch (error) {
      next(error);
    }
  };
  


  module.exports = {
    createEmprendimiento,
    getEmprendimiento,
    getOneEmprendimiento,
    getEmprendimientoByEmail,
  }
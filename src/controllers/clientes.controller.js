const httpError = require("http-errors");

const Cliente = require("../models/clientes.model");

const createCliente = async (req, res, next) => {
    try {
      console.log("Datos recibidos en el servidor:", req.body);
  
      const { body } = req;
  
      // Verificar duplicados con $or
      const existingCliente = await Cliente.find({
        $or: [
          { correoElectronico: body.correoElectronico },
          { nombre: body.nombre },
          { infoContacto: body.infoContacto },
        ],
      });
  
      if (existingCliente.length > 0) {
        // Si ya existe, enviar una respuesta con código 409 y el mensaje adecuado
        return res.status(409).json({
          message: 'Correo, nombre o contacto ya registrados',
        });
      }
  
      // Si no hay duplicados, crear el nuevo Ciente
      const newCliente = new Cliente({
        ...body,
      });
  
      const savedCliente = await newCliente.save();
  
      if (!savedCliente) throw httpError(500, "Cliente no creado");
  
      res.status(201).json({
        message: "Cliente creado y registrado correctamente",
        data: savedCliente,
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
  

  const getCliente = async (req, res, next) => {
    try {
        const clientes = await Cliente.find();
        if (!clientes) throw httpError(404, "ningun cliente encontrado");
        res.status(200).json({ data: clientes });
    } catch (error) {
      next(error);
    }
  };

  const getOneCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id);

        if (!cliente) throw httpError(404, "Cliente no encontrado");
        res.status(200).json({ data: cliente });

    } catch (error) {
      next(error);
    }
  };

  const getClienteByEmail = async (req, res, next) => {
    try {
      const { correoElectronico } = req.params;
      const cliente = await Cliente.findOne({ correoElectronico });
  
      if (!cliente) {
        console.log('Cliente no encontrado');
        throw httpError(404, "Cliente no encontrado");
      }
      console.log('Cliente encontrado:', cliente);
      res.status(200).json({ data: cliente });
    } catch (error) {
      next(error);
    }
  };


  module.exports = {
    createCliente,
    getCliente,
    getOneCliente,
    getClienteByEmail,
  }
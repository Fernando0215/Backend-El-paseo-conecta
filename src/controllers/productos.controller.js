const httpError = require("http-errors");

const Producto = require("../models/productos.model");

const createProducto = async (req, res, next) => {
    try {

      console.log("Datos recibidos en el servidor:", req.body); 
        const { body } = req;

        const newProducto = new Producto({
            ...body,
          });

        const savedProducto = await newProducto.save();

        if (!savedProducto) throw httpError(500, "Producto no creada");
        res.status(201).json({ message: "Producto creado y pulicado con exito :D", data: savedProducto });

      } catch (error) {
        console.error(error);
        next(error);  
    }
  };

  const getProducto = async (req, res, next) => {
    try {
        const productos = await Producto.find();
        if (!productos) throw httpError(404, "ningun producto encontrado para mostrar ;c");
        res.status(200).json({ data: productos });
    } catch (error) {
      next(error);
    }
  };

  const getOneProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);

        if (!producto) throw httpError(404, "Producto no encontrado");
        res.status(200).json({ data: producto });

    } catch (error) {
      next(error);
    }
  };

  const updateProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body, file } = req;
        const toUpdateProducto = await Producto.findById(id);
        if (!toUpdateProducto) throw httpError(404, "Producto no encontrado");

        const updatedProducto = await Producto.findByIdAndUpdate(id, {
            ...body,
            imagenProducto: file ? file.path : undefined,
          }, {
            new: true,
          });
          if (!updatedProducto) throw httpError(500, "Producto no fue actualizado");
          res.status(200).json({ message: "producto actualizado con exito", data: updatedProducto });
    } catch (error) {
      next(error);
    }
  };

  const reactToProducto = async (req, res, next) => {
    try {
      const { productoId, reactionType } = req.params;
  
      let updateField;
      if (reactionType === 'hearts') {
        updateField = 'reacciones.hearts';
      } else {
        throw httpError(400, 'Tipo de reacción no válido');
      }

      const updatedProducto = await Producto.findByIdAndUpdate(
        productoId,
        { $inc: { [updateField]: 1 } },
        { new: true }
      );
  
      if (!updatedProducto) {
        throw httpError(404, 'Producto no encontrado');
      }
  
      res.status(200).json({ message: 'Producto actualizado con likes exitosamente', data: updatedProducto });
    } catch (error) {
      next(error);
    }
};

const DeleteOneProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) throw httpError(404, "Producto no encontrado y por tanto no borrado");
        const productoToBeDeleted = await producto.deleteOne();
        if (!productoToBeDeleted) throw httpError(500, "Producto no borrado");
        res.status(200).json({ message: "Producto borrado correctamente", data: producto });
        
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    createProducto,
    updateProducto,
    getProducto,
    getOneProducto,
    reactToProducto,
    DeleteOneProducto,
  };

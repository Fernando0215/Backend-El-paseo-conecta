const httpError = require("http-errors");

const Noticia = require("../models/noticias.model");

const createNoticia = async (req, res, next) => {
    try {
        const { body } = req;

        const newNoticia = new Noticia(body);
        const savedNoticia = await newNoticia.save();

        if (!savedNoticia) throw httpError(500, "Noticia no creada");
        res.status(201).json({ message: "Noticia creada :D", data: savedNoticia });

       } catch (error) {
         next(error);
       }
  };

  const getNoticias = async (req, res, next) => {
    try {
        const noticias = await Noticia.find();
        if (!movies) throw httpError(404, "ninguna noticia encontrada para mostrar ;c");
        res.status(200).json({ data: noticias });
    } catch (error) {
      next(error);
    }
  };

  const reactToNoticia = async (req, res, next) => {
    try {
      const { noticiaId, reactionType } = req.params;
  
      let updateField;
      if (reactionType === 'hearts') {
        updateField = 'reacciones.hearts';
      } else if (reactionType === 'dislikes') {
        updateField = 'reacciones.dislikes';
      } else {
        throw httpError(400, 'Tipo de reacción no válido');
      }
  
      const updatedNoticia = await Noticia.findByIdAndUpdate(
        noticiaId,
        { $inc: { [updateField]: 1 } },
        { new: true }
      );
  
      if (!updatedNoticia) {
        throw httpError(404, 'Noticia no encontrada');
      }
  
      res.status(200).json({ message: 'Reacción exitosa', data: updatedNoticia });
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createNoticia,
    getNoticias,
    reactToNoticia,
  };
  
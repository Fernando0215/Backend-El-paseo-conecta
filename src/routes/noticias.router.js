const express = require("express");
const router = express.Router();

const {
    createNoticia,
    getNoticias,
    reactToNoticia,

  } = require("../controllers/noticias.controller");

  router.post("/", createNoticia);
  router.get("/", getNoticias);
  router.post('/noticias/:noticiaId/react/:reactionType', reactToNoticia);

  /*module.exports = router;*/
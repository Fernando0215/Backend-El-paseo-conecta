const express = require("express");
const router = express.Router();

const {
    createCliente,
    getCliente,
    getOneCliente,
    getClienteByEmail
  } = require("../controllers/clientes.controller");

const {
    idInParams,
    createClienteValidator,
} = require("../validators/clientes.validator");

const { runValidation } = require("../middlewares/validator.middleware");

router.post("/", createClienteValidator, runValidation, createCliente);
router.get("/", getCliente);
router.get("/:id", getOneCliente);
router.get("/clientes/email/:correoElectronico", getClienteByEmail);

module.exports = router;
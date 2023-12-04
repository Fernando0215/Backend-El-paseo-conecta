const express = require("express");
const router = express.Router();

const {
    createEmprendimiento,
    getEmprendimiento,
    getOneEmprendimiento,
    getEmprendimientoByEmail,
  } = require("../controllers/emprendimientos.controller");

const {
    idInParams,
    createEmprendimientoValidator,
} = require("../validators/emprendimientos.validator");

const { runValidation } = require("../middlewares/validator.middleware");

router.post("/", createEmprendimientoValidator, runValidation, createEmprendimiento);
router.get("/", getEmprendimiento);
router.get("/:id", getOneEmprendimiento);
router.get("/:correo", getEmprendimientoByEmail);

module.exports = router;

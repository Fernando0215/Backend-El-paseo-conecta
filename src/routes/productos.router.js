const express = require("express");
const router = express.Router();

const {
    createProducto,
    getProducto,
    getOneProducto,
    updateProducto,
    reactToProducto,
  } = require("../controllers/productos.controller");

const {
    idInParams,
    createProductoValidator,
    updateProductosValidator,
} = require("../validators/productos.validator");

const { runValidation } = require("../middlewares/validator.middleware");

router.post("/", createProductoValidator, runValidation, createProducto);
router.get("/", getProducto);
router.get("/:id", getOneProducto);
router.put("/:id", updateProductosValidator, runValidation, updateProducto);

module.exports = router;

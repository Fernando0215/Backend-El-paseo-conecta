const expresss = require("express");
const router = expresss.Router();

const authController = require("../controllers/auth.controller");
const runValidation = require("../validators/index.middleware");
const { registerValidator } = require("../validators/auth.validator");

router.post("/register",
    registerValidator,
    runValidation,
    authController.register
);

router.post("/login", 
    authController.login
);

module.exports = router;
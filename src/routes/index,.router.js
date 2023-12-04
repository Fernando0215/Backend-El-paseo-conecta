const expresss = require("express");
const router = express.Router();

const authRouter = require("./auth.router");

// /api/...
router.use("/auth", authRouter);

module.exports = router;
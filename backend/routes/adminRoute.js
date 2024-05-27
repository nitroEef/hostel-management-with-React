const express = require("express");
const { register, login, getAdmin } = require("../controllers/adminController")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:adminId", getAdmin);
module.exports = router;
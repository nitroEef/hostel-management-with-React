const express = require("express");
const { register, login, getAdmin, deleteAdmin } = require("../controllers/adminController")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:adminId", getAdmin);
router.delete("/:adminId", deleteAdmin);

module.exports = router;
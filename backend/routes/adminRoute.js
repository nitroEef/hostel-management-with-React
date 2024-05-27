const express = require("express");
const { register, login, getAdmin, getAdmins, deleteAdmin } = require("../controllers/adminController")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:adminId", getAdmin);
router.delete("/:adminId", deleteAdmin);
router.get("/", getAdmins);


module.exports = router;
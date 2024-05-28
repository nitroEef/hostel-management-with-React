const express = require("express");
const { createNewRoom, getAllRooms, getRoom} = require("../controllers/roomController")
const router = express.Router();

router.post("/createNewRoom", createNewRoom);
router.post("/getAllRooms", getAllRooms);
router.post("/getRoom", getRoom);




module.exports = router;

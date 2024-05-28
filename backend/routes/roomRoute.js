const express = require("express");
const {
  createNewRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const router = express.Router();

router.post("/createNewRoom", createNewRoom);
router.post("/get-all-room", getAllRooms);
router.get("/get-single-room", getRoom);
router.patch("/getRoom", getRoom);
router.post("/getRoom", getRoom);


module.exports = router;

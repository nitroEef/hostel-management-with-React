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
router.get("/get-single-room/:roomId", getRoom);
router.patch("/update-room/:roomId",updateRoom);
router.post("/delete-room/:roomId", deleteRoom);


module.exports = router;

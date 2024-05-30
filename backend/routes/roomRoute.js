const express = require("express");
const {
  createNewRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createNewRoom",protect, createNewRoom);
router.get("/get-all-room",protect,  getAllRooms);
router.get("/get-single-room/:roomId",protect, getRoom);
router.patch("/update-room/:roomId",protect,updateRoom);
router.post("/delete-room/:roomId",protect, deleteRoom);


module.exports = router;


jicdbsdjhkdjhcsdhhhhhhhhhhhhhhhhhhhhhhhhhh
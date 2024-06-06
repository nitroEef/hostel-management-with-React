const express = require('express');
const { registerStudent, getAllStudent, getStudent, updateStudentProfile, changeStudentRoom, updateCheckInStatus, deleteStudent } = require('../controllers/studentController');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

router.post("/register-student", registerStudent);
router.get("/", getAllStudent);
router.get("/:_id", protect, getStudent);
router.patch("/:_id", protect, updateStudentProfile);
router.post("/change-room",protect, changeStudentRoom);
router.post("/check-in-status",protect, updateCheckInStatus);
router.delete("/delete-student/:_id", deleteStudent);



module.exports = router;










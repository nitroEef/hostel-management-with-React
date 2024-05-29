const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Room = require("../models/roomModel");
const generateUniqueId = require("../utils/generateUniqueId");

const ensureUniqueId = async () =>{
    let uniqueId;
    let idExists = true;

    while (idExists){
        uniqueId = generateUniqueId();
        const existingStudent = await Student.findById( uniqueId);
        idExists = existingStudent;
    }

    return uniqueId;
}

const registerStudent = asyncHandler (async (req, res) => {
    const {name, age , gender, nationality, email, g_name, g_email, roomNum} = req.body;

    if(!name || !age || !gender || !nationality ||email || !g_name || !g_email || !roomNum) {
        res.status(400);
        throw new Error("Please! fill all the required field")
    };

    const studentExist = await Student.findOne({ email});
    if (studentExist) {
        res.status(400).
        json("Student already Exists")
    }

    // to get a room by its room number
    const room = await Room.findOne({roomNumber:roomNum});
    if(!room) {
        res.status(404).
        json("Room does not Exists")
    }
    //to check if the room is available
    if (room.roomStatus !== "available"){
        return res.status(404).json("Room is not available")
    }
}) ;









const getAllStudent = asyncHandler (async (req, res) => {}) ;
const getStudent = asyncHandler (async (req, res) => {}) ;
const updateStudentProfile = asyncHandler (async (req, res) => {}) ;
const changeStudentRoom = asyncHandler (async (req, res) => {}) ;
const updateCheckInStatus = asyncHandler (async (req, res) => {}) ;
const deleteStudent= asyncHandler (async (req, res) => {}) ;

module.exports = {registerStudent,
    getAllStudent,
    getStudent,
    updateStudentProfile,
    changeStudentRoom,
    updateCheckInStatus,
    deleteStudent}


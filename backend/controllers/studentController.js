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

const registerStudent = asyncHandler (async (req, res) => {}) ;
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


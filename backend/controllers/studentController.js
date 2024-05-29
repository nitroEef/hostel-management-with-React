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

const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");


//Create new room
const createNewRoom = asyncHandler(async(req, res) => {
    const {roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus} = req.body;

       if (!roomNumber || !roomCapacity || !roomLocation ) {
       res.status(400);throw new Error ("Please! fill all the required field")
       }
       const roomExist = await Room.findOne({roomNumber});

       roomExist && (() => {
        res.status(400);
        throw new Error("Room already Exists")
       })
    
    const room = await Room.create({
        roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus
    })

    if(room) {
        const { _id, roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus} = room;

        res.status(201).json({
            _id, roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus
        })
    }else {
        res.status(400);
        throw new Error("Invalid Data")
    }

});

const getAllRooms = asyncHandler(async (req, res) => {
const getrooms = await Room.find().sort()
    
 if (!getrooms) {
      res.status(500);
      throw new Error("something went wrong");
    }
    
    res.status(200).json(getrooms);
  });


  const getRoom = asyncHandler(async(req,res) => {
    const roomId = req.params.roomId;
    try{
      const room = await Room.findById(roomId);
      if(room){
        const{_id, roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus} = room;
        res.status(200).json({_id, roomNumber, roomCapacity, roomOccupancy, roomLocation,  roomStatus})
      }
    }
    catch(error){
      res.status(500).json("Server Error");
    }














module.exports = {createNewRoom, getAllRooms, getRoom} 

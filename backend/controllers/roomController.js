const asyncHandler = require("express-async-handler");
const Room= require("../models/roomModel");

const createNewRoom = asyncHandler(async (req, res) => {
    try {
    const { roomNumber, roomCapacity, roomOccupancy,  } = req.body;
      !roomNumber || !roomCapacity || !roomOccupancy  &&
            (() => {
              res.status(400);
              throw new Error("pls fill gbogbo required fields yen asap");
            })();
      
  
          const roomExists = await Room.findOne( roomNumber );
          roomExists &&
            (() => {
              res.status(400);
              throw new Error("room already exists");
            }) ();


        if (Room) {
            const {roomNumber, roomCapacity, roomOccupancy, roomLocation, roomStatus} = Room;
            res.status(201).json({
                
                roomNumber, roomCapacity, roomOccupancy, roomLocation, roomStatus
            });
        } else{
            res.status(400);
            throw new Error("Invalid Data");
        }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


//get all rooms baby
const getAllRooms = asyncHandler(async (req, res) => {
  
    const roomies = await Room.find().sort("-createdAt");
    
    if (!roomies) {
      res.status(500);
      throw new Error("something went wrong");
    }
    
    res.status(200).json(roomies);
  });


  const getRoom = asyncHandler(async (req, res) => {
    try {
      const { roomNumber } = req.params;
      
      const oneRoom = await Room.findOne({ roomNumber });
  
      if (oneRoom) {
        const { roomNumber, roomCapacity } = oneRoom;
        res.status(200).json({ roomNumber, roomCapacity });
      } else {
        res.status(404).json({ message: "Room not found" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  });
  



module.exports = {createNewRoom, getAllRooms, getRoom} 

  
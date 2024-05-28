


// //get all rooms baby
// const getAllRooms = asyncHandler(async (req, res) => {
  
//     const roomies = await Room.find().sort("-createdAt");
    
//     if (!roomies) {
//       res.status(500);
//       throw new Error("something went wrong");
//     }
    
//     res.status(200).json(roomies);
//   });


//   //get room
//   const getRoom = asyncHandler(async (req, res) => {
//     try {
//       const { roomNumber } = req.params;
      
//       const oneRoom = await Room.findOne({ roomNumber });
  
//       if (oneRoom) {
//         const { roomNumber, roomCapacity } = oneRoom;
//         res.status(200).json({ roomNumber, roomCapacity });
//       } else {
//         res.status(404).json({ message: "Room not found" });
//       }
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ message: "Server Error" });
//     }
//   });
  



// module.exports = {createNewRoom, getAllRooms, getRoom} 





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

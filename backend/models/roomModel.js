const mongoose = require('mongoose')
const bcrypt = require('bcryptjs'); 

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: number,
        required: true
    },
    roomCapacity: {
        type: Number,
        required: true
    },
    roomOccupancy: {
        type: String,
        required: true
    },

    roomLocation: {
        type: String,
        required: true
    },
    roomStatus: {
        type: String,
        required: true
    }
})
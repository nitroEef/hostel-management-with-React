const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');hkwjkbdjkwdjkdjkjkedneklnfk

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: number,
        required: true
    },
    capacity: {
        type: number,
        required: true
    },
    occupancy: {
        type: number,
        required: true
    },

    location: {
        type: string,
        required: true
    },
    status: {
        type: string,
        required: true
    }
})
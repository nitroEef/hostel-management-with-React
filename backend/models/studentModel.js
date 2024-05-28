const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');



const guardianSchema = mongoose.Schema({
    guardianName :{
        type: String,
        required: true
    },
    guardianEmail: {
        type: String,
        required: [true, 'please add an email'],
        trim: true
    })

    
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
    }
    })


//for students

const studentSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },

 name:{
        type:String,
        required:true,
        unique:true
    },

 age:{
        type:Number,
        required:true,
        unique:true
    }, 
    
gender:{
    
        type:String,
        required:true,
        unique:true,
        enum:['male','female', 'others']
    },

nationality:{
    type:String,
    required:true,
    unique:true,
},

email:{
    type:String,
    required:[true,"plase add email e"],
    trim:true,
    lowercase:true,
    unique:true,

}
})


hibfiiiiiiiiiiiiiiiiiiiiiiiVREYYUUUUUUUUUUUUUUUUUUUUHBRCVYUHEFBVYUH
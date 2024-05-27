const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role:{
        type: String,
        default: "admin"
    }
})

// Before saving an Admin document, execute this pre-save middleware function
adminSchema.pre('save', async function (next) {
    
    // Check if the password field has not been modified
    if (!this.isModified("password")) {
        // If the password is not modified, skip the rest of the middleware
        return next();
    }

    // Generate a salt for hashing the password, with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    
    // Replace the plain text password with the hashed password
    this.password = hashedPassword;
    
    // Proceed to the next middleware function or save operation
    next();
});



const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
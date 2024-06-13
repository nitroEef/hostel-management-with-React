const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const  generateToken  = require("../utils/index");


//register a new admin
const register = asyncHandler(async (req, res) => {
  try {
  const { fullname, email, password } = req.body;
    
    !fullname || !email || !password &&
          (() => {
            res.status(400);
            throw new Error("pls fill gbogbo required fields yen asap");
          })();
    
    password.length < 6 &&
        (() => {
          res.status(400);
          throw new Error("password must be up to 6 characters");
        }) ();

        const adminExists = await Admin.findOne({ email })
        adminExists &&
          (() => {
            res.status(400);
            throw new Error("email already exists");
          }) ();

          //to create new admin
        const admin = await Admin.create({
            fullname,
            email,
            password,
          });
       
          const token = generateToken(admin._id);

        //   send http-only cookie 
        res.cookie("token", token,{
            path: "/",
            httpOnly:true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite : "none",
            secure:true
        })

        if (admin) {
            const {_id, fullname, email, role} = admin;
            res.status(201).json({
                _id,
                fullname,
                email,
                role,
                token
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



//admin login
const login = asyncHandler (async (req,res) => {
  try{
    const {email, password} = req.body;

    //check if admi exist
    let admin = await Admin.findOne({email});
    if(!admin) {
     return res.status(400). json({"message":"admin no dey"});
    }

    //check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if(!isMatch) {
      return res.status(400). json({"message":"invalid credentials na"});
  
  }

  const token = generateToken(admin._id);

  if (admin && isMatch) {

      res.cookie("token", token,{
            path: "/",
            httpOnly:true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite : "none",
            secure:true
        });

    const {_id, fullname, email, role} = admin;

    //send http-oly cookie

    res.status(201).json({
      _id,
      fullname,
      email,
      role,
      token
        })


      }else{
        res.status(500);
        throw new Error("something went wrong");
      }
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

// delete an admin 
const deleteAdmin = asyncHandler(async(req, res) => {
  try{
    const {adminId} = req.params
    const admin = Admin.findById(adminId);
  
      if(!admin){
        res.status(404);
        throw new Error("user not found");
      }
      await Admin.deleteOne();
      res.status(200).json({"message": "Admin deleted successfully"});
  }catch(error){
      console.error(error.message);
      res.status(500).send("server error");
  }
});


// Define an asynchronous route handler for retrieving a specific admin by ID
const getAdmin = asyncHandler(async (req, res) => {
  try {
    // Extract adminId from request parameters
    const { adminId } = req.params;
    
    // Find the admin by ID
    const admin = await Admin.findById(adminId);
    
    // If the admin is found, extract specific fields and send them in the response
    if (admin) {
      const { _id, fullname, email, role } = admin;
      res.status(200).json({ _id, fullname, email, role });
    } else {
      // If the admin is not found, send a 404 response with a message
      res.status(404).json({ "message": "we no find admin" });
    }
  } catch (error) {
    // Log any errors to the console and send a 500 response with a message
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});




//get details of all admins
// Define an asynchronous route handler for retrieving all admins
const getAdmins = asyncHandler(async (req, res) => {
  
  // Find all admin documents, sort them by creation date in descending order, 
  // and exclude the password field
  const admins = await Admin.find().sort("-createdAt").select("-password");
  
  // If no admins are found, set the status to 500 and throw an error
  if (!admins) {
    res.status(500);
    throw new Error("something went wrong");
  }
  
  // Send the retrieved admin documents in the response with a status of 200 (OK)
  res.status(200).json(admins);
});


// to update admins 
const updateAdmin = asyncHandler(async (req, res) => {
  const  adminId  = req.params.adminId;
  const {role} = req.body;

    try{
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({message:"admin not found"});
    }

    admin.role = role

    await admin.save();

    res.status(200).json(admin)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Server Error"});
  }
})













//   // Finding the admin by ID and excluding the password field from the result
//   const admin = await Admin.findById(adminId).select("-password");

//   if (admin) {
//     // If the admin exists, update the fields if they are provided in the request body
//     if (req.body?.fullname) admin.fullname = req.body.fullname;
//     if (req.body?.email) admin.email = req.body.email;
//     if (req.body?.role) admin.role = req.body.role;

//     // Save the updated admin document to the database
//     const result = await admin.save();

//     // Respond with the updated admin document
//     res.json(result);
//   } else {
//     // If the admin does not exist, respond with an appropriate message (could be a 404 error)
//     res.status(404).json({ message: 'Admin not found' });
//   }
// });



// Define an asynchronous route handler for logging out an admin user
const logoutAdmin = asyncHandler(async (req, res) => {
  
  // Set a cookie named "token" with an empty value to effectively log out the user
  res.cookie("token", "", {
    // Set the path for which the cookie is valid; "/" means the cookie is valid for the entire domain
    path: "/",
    
    // Make the cookie accessible only via HTTP(S), not JavaScript (enhances security)
    httpOnly: true,
    
    // Set the expiration date of the cookie to 1 day (86400 seconds) from now
    expires: new Date(0), 
    
    // Ensure the cookie is sent only in requests with the same site, to prevent CSRF attacks
    sameSite: "none",
    
    // Ensure the cookie is sent only over HTTPS connections
    secure: true,
  });

  // Send a response indicating that the user has been logged out
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = {register, login, getAdmin, deleteAdmin, getAdmins, updateAdmin, logoutAdmin} 

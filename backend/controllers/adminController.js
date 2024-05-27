const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const  generateToken  = require("../utils/index");

//register a new admi
const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    
      !fullname ||
        !email ||
        !password &&
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


const getAdmin = asyncHandler(async (req, res) =>{
  try{
    const {adminId} = req.params;
    const admin = await Admin.findById(adminId);
  
    if(admin) {
      const{ _id, fullname, email, role } = admin;
      res.status(200).json({
        _id, fullname, email, role});

    }else{
      res.status(404).json({"message":"we no find admin"})
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



//get details of a single admin
const getAdmins = asyncHandler(async(req, res) => {
  const admins = await Admin.find().sort("-createdAt").select("-password");
  if(!admins){
    res.status(500)
    throw new Error("something went wrong")
  }
    res.status(200).json(admins);
  })


// const updateAdmin = asyncHandler(async(req, res) => {
//   const admin = await Admin.findById(req.admin._id)

//     if(admin){
//       const {_id, fullname, email, role} = admin

//       admin._id = _id,
//       admin.email = email;
//       admin.fullname = req.body.name || fullname
//       admin.role = req.body.role || role

//       const updatedAdmin = await admin.save()

//       res.status(200).json({
//         _id: updatedAdmin._id,
//         fullname: updatedAdmin.fullname,
//         email: updatedAdmin.email,
//         role: updatedAdmin.role
//       })

//     } else {
//       res.status(404)
//       throw new Error("admin not found")
//     }
// })

const updateAdmin = asyncHandler(async (req, res) => {

  const { adminId } = req.params;

    const admin = await Admin.findById(adminId).select("-password");

    if (admin) {

      if (req.body?.fullname) admin.fullname = req.body.fullname;
      if (req.body?.email) admin.email = req.body.email;
      if (req.body?.role) admin.role = req.body.role;
  
      const result = await admin.save()

      res.json(result)

}

})

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token","",{
    path:"/",
    httpOnly:true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite : "none",
    secure:true
  })

return res.status(200).json({message:"logout is successful"})

})
module.exports = {register, login, getAdmin, deleteAdmin, getAdmins, updateAdmin, logoutAdmin}
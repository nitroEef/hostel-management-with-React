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

//to delete a admin


module.exports = {register, login, getAdmin}
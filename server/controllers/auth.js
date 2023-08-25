import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register user */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Create an asynchronous function
    const salt = await bcrypt.genSalt();  //we used this to encrypt our pass
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Logging in 
export const login= async (req,res)=>{
  try{
const {email,password}= req.body;
const user= await User.firstOne({email:email})
if(!user) return res.status(400).json({msg:"USer doesn't exist "});

const isMatch= await bcrypt.compare(password, user.password)
if(!isMatch) return res.status(400).json({msg:"invalid user"});
  
const token= jwt.sign({id: user.id}, process.env,
  JWT_SECRET)
  res.status(200).json({token, user})
}catch(err){
    res.status(500).json({error: err.message})

  }
}
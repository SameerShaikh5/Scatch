const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken')

const registerUser = async (req, res) => {
    try {
      let { fullname, email, password } = req.body;

      if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Fullname, email, and password are required." });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists." });
      }

      let hashedpass = await bcrypt.hash(password, 10);

      let user = await userModel.create({
        fullname: fullname,
        email: email,
        password: hashedpass,
      });
      let token =  generateToken(user)
      res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000})
      return res.send("user created successfully!")

    } catch (error) {
      console.log(error.message);
    }
}

const loginUser = async (req,res)=>{
    let {email, password} = req.body
    if (!email || !password){
        return res.status(500).send("Please provide credentials!")
    }
    let user = await userModel.findOne({email:email})

    if(!user){
        return res.status(500).send("User doesn't exists!")
    }
    let result = await bcrypt.compare(password, user.password)
    if (result){
      let token = generateToken(user)
      res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000})
      return res.status(200).send("Logged In successfully!")
    }
    else{
        return res.status(200).send("Incorrect password")
    }

}

const logoutUser = async (req,res)=>{
  res.cookie("token", "")
  return res.redirect("/")
}

module.exports = {registerUser, loginUser, logoutUser}
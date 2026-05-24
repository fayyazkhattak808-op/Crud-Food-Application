const userModel = require ("../models/usermodels");
const bcrypt = require ("bcryptjs")
const JWT = require ("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    // validation
    if (!username || !email || !password || !phone || !address  ||!answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
     //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password , salt)


    // check user+
    const existing = await userModel.findOne({ email });

    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    // create user
    const user = await userModel.create({
      username,
      email,
      password:  hashedpassword,
      phone,
      address,
      answer,
      
  
    });

    return res.status(201).send({
      success: true,
      message: "Successfully registered",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};
const loginController =  async (req,res) =>{
  try {
    const {email, password} =  req.body
    if(!email || ! password){
 return res.status(500).send({success:false,
      message:"please provide email and password"})
    }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({success:false,
         message:"user not found "})
    }
//user pasword and password compare
const isMatch = await bcrypt.compare(password , user.password)
if(!isMatch){
  return res.status(500).send({success:false,
      message:"invalid credentials"})}

      //token
      const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: "9d"
      })
user.password = undefined;
    res.status(200).send({
      success:true ,
      message:"login successfully",
      token,
      user,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({success:false,
      message:"error in login api", error})
  }
}

module.exports = { registerController ,loginController  };
const usermodels = require("../models/usermodels")
const userModel = require("../models/usermodels")
const bcrypt  = require ("bcryptjs")
const getuserController =  async (req,res) =>{
try {
    const user = await userModel.findById(req.user.id)
    //validation 
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }
    //hide password
    user.password = undefined
    //response
    res.status(200).send({
        success:true,
        message:"successfully true",
        user
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message: "error in get user api",
        error
    })
}
}
const updateuserController = async (req, res) => {
  try {

    // find user
    const user = await userModel.findById({_id:req.user.id});

    // check user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // get data
    const { username, phone, address } = req.body;

    // update fields
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save updated user
    await user.save();

    // response
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

const updatepasswordCOntroller = async (req, res) => {
  try {

    // find logged-in user
    const user = await userModel.findById(req.user.id);

    // check user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // get data
    const { oldpassword, newpassword } = req.body;

    // validation
    if (!oldpassword || !newpassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    // compare old password
    const isMatch = await bcrypt.compare(
      oldpassword,
      user.password
    );

    // check old password
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Old Password",
      });
    }

    // generate salt
    const salt = bcrypt.genSaltSync(10);

    // hash new password
    const hashedpassword = await bcrypt.hash(
      newpassword,
      salt
    );

    // save new password
    user.password = hashedpassword;

    // save user
    await user.save();

    // response
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};
//reset password
const resetpasswordController = async ( req,res)=>{
try {
    const {email,newpassword,answer} = req.body
    //validation 
    if(!email  ||  !newpassword || !answer)
        return res.status(404).send({
    success:false,
message:"please provide all feilds", 
})
//user data
const user = await userModel.findOne({email,answer})
//validation
if(!user){
    return res.status(500).send({
        success:false,
        message:"user not found or invalid answer"
    })
    
}
  //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword , salt)
    user.password = hashedpassword 
    await user.save()
    res.status(200).send({
        success:true,
        message:"password reset successfully"
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in reset password api",
        error
    })
    
}
}


const deleteprofileController = async  ( req,res)=>{
try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"your account has been deleted",
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in delete profile api",
    })
}
}




module.exports = { getuserController , updateuserController,
     updatepasswordCOntroller , 
     resetpasswordController,
      deleteprofileController};




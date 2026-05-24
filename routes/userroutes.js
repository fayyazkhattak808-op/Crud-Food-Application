const express = require ("express");
const { getuserController, updateuserController, updatepasswordCOntroller, resetpasswordController, deleteprofileController } = require("../controllers/usercontrollers");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();


//route get method
router.get("/getuser",authmiddleware, getuserController)


///put register
router.put("/updateuser",authmiddleware,updateuserController)


 
//update password  post method
router.post("/updatepassword",authmiddleware, updatepasswordCOntroller)


//reset password
router.post("/resetpassword",authmiddleware,resetpasswordController)


//delete route
router.delete ("/deleteuser/:id",authmiddleware, deleteprofileController)




module.exports = router;
const express = require ("express")

const authmiddleware = require("../middlewares/authmiddleware");
const {createcatController, getAllcatController, updatecatCOntroller , deletecatController 
} = require("../controllers/categorycontroller");

const router = express.Router();



//create post
router.post("/create",authmiddleware, createcatController)

//get all cat
router.get("/getall", getAllcatController)

//category update
router.put("/update/:id" , authmiddleware, updatecatCOntroller)
///delete id 
router.delete("/delete/:id" , authmiddleware, deletecatController )





module.exports = router;
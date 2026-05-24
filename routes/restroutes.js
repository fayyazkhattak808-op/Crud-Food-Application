const express = require ("express")

const authmiddleware = require("../middlewares/authmiddleware");
const { createrestController, getallrestCOntroller,
     getrestbyIdCOntroller, deleterestController, } = require("../controllers/restcontrollers");
const router = express.Router();

//create route post
router.post("/create", authmiddleware, createrestController) 
//get all
router.get ("/getall",  getallrestCOntroller)


//get by id 
router.get ("/get/:id", getrestbyIdCOntroller)

//delete byid get method
router.delete("/delete/:id", authmiddleware,  deleterestController)







module.exports = router;
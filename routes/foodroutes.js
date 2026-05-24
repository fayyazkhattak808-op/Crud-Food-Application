const express = require ("express")

const authmiddleware = require("../middlewares/authmiddleware");
const {createfoodController, getfoodController, 
    getsinglefoodController, getfoodbyrestContoller,
    updateFoodController, deleteFoodController,placeOrderController, orderstatusController} = require("../controllers/foodcontroller");
const clientmiddleware = require("../middlewares/clientmiddleware");


const router = express.Router();

//post rpoute create food
router.post("/create", authmiddleware, createfoodController)

//use get route
router.get("/getallfood", getfoodController)

//get restfood by id
router.get("/getrestfood/:id", getfoodbyrestContoller)


//get single food 
router.get("/getsinglefood/:id", getsinglefoodController)


//put route means update
router.put("/updatefood/:id", authmiddleware, updateFoodController)


//delete route
router.delete("/delete/:id", authmiddleware,  deleteFoodController)

//new route orderplace post route
router.post("/placeorder" ,authmiddleware, placeOrderController )

//order status
router.post("/orderstatus/:id", authmiddleware, clientmiddleware, orderstatusController)






module.exports = router;
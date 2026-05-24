const express = require ("express");
const { testUserController } = require("../controllers/testcontroller");
const router = express.Router();


//router/get/post
router.get("/testuser",testUserController)




module.exports = router;
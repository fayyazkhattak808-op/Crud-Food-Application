const userModel = require("../models/usermodels")

module.exports = async (req, res, next) => {
  try {
    // 1. Check req.user exists
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "No user found in request (auth middleware issue)",
      });
    }

    // 2. FIX: support both id formats (_id OR id)
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "User ID missing in token",
      });
    }

    // 3. Get user from DB
    const user = await userModel.findById(userId);

    // 4. STOP CRASH HERE (THIS FIXES YOUR ERROR)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found in database",
      });
    }

    // 5. Check admin role
    if (user.usertype !== "client") {
      return res.status(403).send({
        success: false,
        message: "Only admin access allowed",
      });
    }

    next();

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Middleware error",
      error: error.message,
    });
  }
};
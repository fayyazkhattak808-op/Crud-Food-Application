const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized token",
        });
      }

      req.user = decoded; // ✅ correct placement
      next(); // ✅ only runs when token is valid
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
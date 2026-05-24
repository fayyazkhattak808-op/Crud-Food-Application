const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    imageurl: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
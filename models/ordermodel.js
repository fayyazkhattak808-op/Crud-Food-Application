const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // 1. Foods (array of Food references)
    food: [
       {
    title: String,
    price: Number,
    description: String,
  }
    ],

    // 2. Payment method (string like COD, card, etc.)
    payment: {
    },

    // 3. Buyer (User reference)
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 4. Order status tracking
    orderStatus: {
      type: String,
      enum: ["prepare", "preparing", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require ("mongoose");

// schema
const restSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },


    food: {
      type: Array,
    },

    time: {
      type: String,
    },

    pickup: {
      type: Boolean,
      default: true,
    },

    delivery: {
      type: Boolean,
      default: true,
    },

    isopen: {
      type: Boolean,
      default: true,
    },

    

    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },

    ratingcount: {
      type: String,
    },

    code: {
      type: String,
    },

   
  },

  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restSchema);
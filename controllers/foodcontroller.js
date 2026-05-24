const foodModel = require("../models/foodmodel");

const createfoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodtags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    // validation
    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      foodtags,
      category,
      code,
      isAvailable,
      restaurant, // ✅ correct spelling
      rating,
    });

    await newFood.save();

    return res.status(201).send({
      success: true,
      message: "New food item created",
      food: newFood,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

const getfoodController = async (req, res) => {
  try {
    const getfood = await foodModel.find({});

    if (!getfood) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    return res.status(200).send({
      success: true,
      totalfood: getfood.length,
      getfood,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food API",
      error,
    });
  }
};
const getsinglefoodController = async (req, res) => {
  try {
    const  foodId  = req.params.id;
if(!foodId){
    return res.status(404).send({
        success: false,
        message: "please provide id",
      });
}
    const food = await foodModel.findById(foodId);

    // validation
    if (!food) {
    return res.status(404).send({
        success: false,
        message: "no food found in db",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Get single food successfully",
      food,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};
const getfoodbyrestContoller = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // validation
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant id not found",
      });
    }

    // get food by restaurant
    const restfood = await foodModel.find({
      restaurant: restaurantId,
    });

    // validation
    if (!restfood ) {
      return res.status(404).send({
        success: false,
        message: "Restaurant food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant food fetched successfully",

      restfood,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in get restaurant food API",
      error,
    });
  }
};



//updatecontroller 
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    // validation
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }

    // find existing food
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    const {
      title,
      description,
      price,
      foodtags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    // update food
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        foodtags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      updatedFood,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    // validation
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id found",
      });
    }

    // find food
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    // delete food
    await foodModel.findByIdAndDelete(foodId);

    return res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};
const orderModel = require("../models/orderModel");

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    // Validate cart
    if (!cart) {
      return res.status(400).send({
        success: false,
        message: "please food cart or payment method",
      });
    }

    // Calculate total
    let total = 0;
    cart.map((i) => {
      total += i.price || 0;
    });

    // Create order
    const newOrder = await orderModel.create({
      food: cart,
      buyer: req.user.id,   // ✅ FIXED HERE
      total: total,
    });

    return res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in place order API",
      error: error.message,
    });
  }
};

//change orser controller
const orderstatusController = async (req, res) => {
  try {
    // Get order ID from URL params (e.g. /order/:id)
    const orderId = req.params.id;

    // Validate order ID
    if (!orderId) {
      return res.status(400).send({
        success: false,
        message: "Order ID is required",
      });
    }

    // Get new status from request body
    const { status } = req.body;

    // Validate status exists
    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Status is required",
      });
    }

    // Define allowed status values (prevents invalid data)
    const allowedStatuses = [
      "prepare",
      "preparing",
      "shipped",
    ]

    // Check if provided status is valid
    if (!allowedStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status value",
      });
    }

    // Update order status in database
    // { new: true } returns the updated document
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    // If no order found with given ID
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // Success response with updated order
    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order, // returning updated order details
    });

  } catch (error) {
    // Log error for debugging
    console.log(error);

    // Server error response
    return res.status(500).send({
      success: false,
      message: "Error in order status API",
      error: error.message,
    });
  }
};
  

module.exports = {createfoodController , 
  getfoodController,getsinglefoodController,getfoodbyrestContoller, updateFoodController, orderstatusController , deleteFoodController,placeOrderController }
const categoryModel = require("../models/categorymodel");

const createcatController = async (req, res) => {
  try {
    const { title, imageurl } = req.body;

    // validation
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Please provide category title",
      });
    }

    // create category
    const newcategory = new categoryModel({
      title,
      imageurl,
    });

    // save category
    await newcategory.save();

    // response
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newcategory,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in create category API",
      error,
    });
  }
};
 

const getAllcatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    // validation
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "Categories not found",
      });
    }

    // success response
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
};

const updatecatCOntroller =  async (req,res)=>{

  try {
    const { id} = req.params;
    const {title , imageurl} = req.body

    // validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }

    const updatecategories = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageurl},
      { new: true }
    );

    // check category
    if (!updatecategories) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // success response
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatecategories,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error,
    });
  }
};
const deletecatController = async (req,res) =>{

  try {
    const { id } = req.params;

    // validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide category id",
      });
    }

    // check category exists
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No category found with this id",
      });
    }

    // delete
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};





module.exports ={ createcatController,  getAllcatController, updatecatCOntroller , deletecatController};
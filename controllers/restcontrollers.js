const restModel = require("../models/restmodel");

// logic
const createrestController = async (req, res) => {
  try {

    const {
      title,
      food,
      time,
      pickup,
      dlivery,
      isopen,
      rating,
      ratingcount,
    } = req.body;

    // validation
    if (!title ) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    // create restaurant
    const newrest = new restModel({
      title,
      food,
      time,
      pickup,
      dlivery,
      isopen,
      rating,
      ratingcount,
      
    });

    await newrest.save();

    return res.status(201).send({
      success: true,
      message: "New restaurant created successfully",
      newrest,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in restaurant create API",
      error,
    });
  }
};

const getallrestCOntroller =  async( req,res)=>{
try {
    const rests = await restModel.find({})
    if(!rests){
        return res.status(404).send({
            success:false,
            message:"no resturtant availale",
        })
    }
    res.status(200).send({
        success:true,
        totalCount:rests.length,
        rests 
    })
} catch (error) {
  console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in get all resturtant ",
      error,
    });  
}

}

const getrestbyIdCOntroller =  async( req,res)  =>{
try {
    const restid = req.params.id
    //validation 
    if(!restid){
        return res.status(404).send({
            success:false,
            message:"please provide rest id"
        })
    }
    const rest = await restModel.findById(restid)
    if(!rest){
        return res.status(404).send({
            success:false,
            message: "rest not found"
        })
    }
    res.status(200).send({
        success:true,
        rest,
    })
} catch (error) {
     console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in get all resturtant by id api ",
      error,
    });  
}
}

const deleterestController  =  async (req,res) =>{
try {
    const restid = req.params.id
    //validation 
    if(!restid){
        return res.status(404).send({
            success:true,
            message:"no rest and found provide restid "
        })
    }
    await restModel.findByIdAndDelete(restid)
        res.status(200).send({success:true,
            message:"id deletre successfully"

        })
    
} catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in delete resturtant by id api ",
      error,
    });  
} 
}


module.exports = { createrestController , getallrestCOntroller, getrestbyIdCOntroller, deleterestController};
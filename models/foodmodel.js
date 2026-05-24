const mongoose = require ("mongoose")
const foodSchema = new mongoose.Schema({
title:{type:String, required :true},
foodtags:{type:String},
category:{type:String},
code:{type:String},
isAvailable:{type:Boolean, default:true},
restaurant:{type:mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
description:{type:String, required:true},
price:{type:Number, required:true},
rating:{type:Number, default:5,min:1 , max:5},

},
    {timestamps:true})

    module.exports = mongoose.model("Food", foodSchema)
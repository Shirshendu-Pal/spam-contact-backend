const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

   name: String,
   description: String,
   image:String,
   categories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
   }]

})
module.exports = mongoose.model("Question", questionSchema)
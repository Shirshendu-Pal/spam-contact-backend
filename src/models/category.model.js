const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name:String,
    image:String,
    description:String,
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]


}, {timestamps: true})
module.exports = mongoose.model("Category", categorySchema)
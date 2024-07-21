const httpStatus = require("http-status");
const { User, Token, Category } = require("../models");
const ApiError = require("../utils/ApiError");

const addCategory = async (reqFile) =>{

    let uploadString = ""
    const body = reqFile.body
    if(reqFile.file)
     uploadString = `uploads/${reqFile.file.filename}`

    const category = await Category.create({
        ...body,
        image:uploadString
    })


    return category;
}
const allCategories = async ({ filters }) => {
    for( let [key , value] of Object.entries(filters)){
        if(value === "") delete filters[key]
    }
    const categories = await Category.aggregate([
        { $match: filters }, 
        {
            $lookup: {
                from: 'questions',       
                localField: 'questions', 
                foreignField: '_id',     
                as: 'questions'
            }
        }
    ]);
    return categories;
};

const categoryDetails = async ({categoryId}) =>{
    const category = await Category.findById(categoryId).populate(["questions"])
    return category;
}

module.exports  ={
    addCategory,
    allCategories,
    categoryDetails
}
const httpStatus = require("http-status");
const { User, Token, Category, Question } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

const addQuestion = async (reqFile) =>{

    let uploadString = ""
    const body = reqFile.body
    if(reqFile.file)
     uploadString = `uploads/${reqFile.file.filename}`

    const question = await Question.create({
        ...body,
        image:uploadString
    })

    await Category.updateMany({_id:{$in:body.categories}}, {$push:{questions: question._id}})


    return question;
}

const allQuestion = async ({filters}) =>{
    for( let [key , value] of Object.entries(filters)){
        if(value === "") delete filters[key]
    }
    const pipeline = [];

    if (filters.categoryId) {
        pipeline.push({
            $match: { categories: mongoose.Types.ObjectId(filters.categoryId) }
        });
        delete filters.categoryId; 
    }
    if (Object.keys(filters).length > 0) {
        pipeline.push({
            $match: filters
        });
    }

    pipeline.push({
        $lookup: {
            from: 'categories',         
            localField: 'categories',   
            foreignField: '_id',        
            as: 'categories'       
        }
    });
    const questions = await Question.aggregate(pipeline);
    return questions;
}

const questionDetails = async ({questionId}) =>{
    const question = await Question.findById(questionId).populate(["categories"])
    return question;
}

module.exports  ={
    addQuestion,
    allQuestion,
    questionDetails
}
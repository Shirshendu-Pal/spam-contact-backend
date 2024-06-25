const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const {User} = require("../models");
const { userAlreadyExists, isPasswordMatches } = require("./authentication.service");
const { generateAuthToken } = require("./token.service");

const userDetails = async ({userId}) =>{
    const user = await User.findAll({id: userId})
    return user;
}
const addUser = async (reqBody) =>{
    await userAlreadyExists(reqBody.phone)
    const user = await User.create({
        ...reqBody
    })
    return user;
}

const loginUser = async (reqBody) =>{

    const user = await User.findOne({phone: reqBody.phone})
    await isPasswordMatches(user , reqBody.password)
    const tokens = await generateAuthToken(user)
    return {user , tokens}

}



module.exports = {
    userDetails,
    addUser,
    loginUser
}
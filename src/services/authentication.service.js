const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require('bcryptjs');

const {User} = require("../models")


const userAlreadyExists = async (phone) =>{

    const user = await User.findOne({phone})
    if(user) throw new ApiError(httpStatus.CONFLICT , "User already exists")
}

const isPasswordMatches = async (user, password) =>{
    const isMatch = await bcrypt.compare(password, user.password)
    if(!user) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password")
    if(!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password")
}

module.exports = {
    userAlreadyExists,
    isPasswordMatches
}
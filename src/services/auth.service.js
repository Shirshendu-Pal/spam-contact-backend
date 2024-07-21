const { User,Token } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const {generateAuthToken} = require("./token.service");
const bcrypt = require("bcryptjs");
// const  generateAuthToken = require("./token.service");
// const { uploadSingle } = require("./upload.service");

const registerUser = async (reqFile) => {
    let uploadString = ""
    const body = reqFile.body
    if(reqFile.file)
     uploadString = `uploads/${reqFile.file.filename}`
    const user = await User.create({ 
        ...body,
        profilePic: uploadString
    });

    return user;
    
};

const loginUser = async (reqBody) => {
    try{
    const user = await User.findOne({email: reqBody.email})
    console.log(user)
    const isMatch = await bcrypt.compare(reqBody.password, user.password)
    console.log(isMatch)
    if(isMatch){
        const tokens = await generateAuthToken(user);
     
      return {user, tokens};
}else{
    throw new ApiError(httpStatus.NOT_FOUND, "Incorrect password.");
}
}catch(error){
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
}
}





module.exports = {
   
    registerUser,
    loginUser

};
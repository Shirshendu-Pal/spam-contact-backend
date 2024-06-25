const { catchAsync } = require("../utils/catchAsync");
const { userService, tokenService } = require("../services");
const httpStatus = require("http-status");



const handleRequest = (serviceFunction, reqQuery , reqFile, reqParam) => {
    return catchAsync(async (req, res) => {
      const requestField = reqQuery?req.query:reqFile?{file:req.file,body:req.body}:reqParam?req.params:req.body
      const result = await serviceFunction(requestField);
      res.status(httpStatus.OK).json({success: true,result});
    });
  };

  module.exports.userDetails = handleRequest(userService.userDetails);
  module.exports.addUser = handleRequest(userService.addUser);
  module.exports.loginUser = handleRequest(userService.loginUser);

const { catchAsync } = require("../utils/catchAsync");
const { contactService, tokenService } = require("../services");
const httpStatus = require("http-status");



const handleRequest = (serviceFunction, reqQuery , reqFile, reqParam) => {
    return catchAsync(async (req, res) => {
      const requestField = reqQuery?req.query:reqFile?{file:req.file,body:req.body}:reqParam?req.params:req.body
      const result = await serviceFunction(requestField);
      res.status(httpStatus.OK).json({success: true,result});
    });
  };

module.exports.addContact = handleRequest(contactService.addContact);
module.exports.getContacts = handleRequest(contactService.getContacts);
module.exports.addContactToSpam = handleRequest(contactService.addContactToSpam);
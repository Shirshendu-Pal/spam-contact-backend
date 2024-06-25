const { Token, User } = require("../models");
const httpStatus = require("http-status");
const tokenTypes = require("../configuration/tokens");
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

module.exports.authCheck = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization)
            token = req.headers.authorization;
        const payload = jwt.verify(token, config.jwt.secret);
        // console.log(payload)
        const tokenDoc = await Token.findOne({ user: payload.sub, type: tokenTypes.REFRESH , include: [{
            model: User,
            as: 'user',
            attributes: ['id'] // specify attributes you want to retrieve
          }]});
        //   console.log(tokenDoc)
        req.user = tokenDoc.userId;
        next();
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid or expired token" });
    }
};
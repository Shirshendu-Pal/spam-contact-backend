const express = require('express');
const router = express.Router();
const userRoutes = require("./user.routes");
const contactRoutes = require("./contact.routes");

const routes = [
   
    {
        path : "/user",
        route : userRoutes
    },
    {
        path : "/contact",
        route : contactRoutes
    },
  
]



routes.forEach((obj) => {
    router.use(obj.path, obj.route);
});

module.exports = router;
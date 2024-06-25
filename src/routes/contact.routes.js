const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { contactValidation } = require("../validations");
const { contactController } = require("../controllers");
const { authCheck } = require("../middlewares/auth");


router.post("/add-contact",authCheck,  validate(contactValidation.addContact),  contactController.addContact)
router.post("/get-contacts", authCheck, validate(contactValidation.getContacts),  contactController.getContacts)
router.post("/spam-contact",authCheck, validate(contactValidation.addContactToSpam),  contactController.addContactToSpam)


module.exports = router;
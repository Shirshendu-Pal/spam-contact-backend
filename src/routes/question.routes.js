const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { questionValidation } = require("../validations");
const { questionController } = require("../controllers");
const multer = require('multer');
const { storage } = require("../configuration/storage");
const upload = multer({ storage: storage });

router.post("/add-question",upload.single('file'), validate(questionValidation.addQuestion),  questionController.addQuestion);
router.post("/get-all-question", validate(questionValidation.allQuestion),  questionController.allQuestion);
router.post("/question-details", validate(questionValidation.questionDetails),  questionController.questionDetails)

module.exports = router;
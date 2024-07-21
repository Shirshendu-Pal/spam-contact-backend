const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { categoryValidation } = require("../validations");
const { categoryController } = require("../controllers");
const multer = require('multer');
const { storage } = require("../configuration/storage");
const upload = multer({ storage: storage });

router.post("/add-category",upload.single('file'), validate(categoryValidation.addCategory),  categoryController.addCategory);
router.post("/get-all-category", validate(categoryValidation.allCategories),  categoryController.allCategories);
router.post("/category-details", validate(categoryValidation.categoryDetails),  categoryController.categoryDetails)


module.exports = router;